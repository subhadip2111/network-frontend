import { TrendingUp } from "lucide-react";
import PostCard from "../posts/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DashBoardLoader from "../common/DashBoardLoader";
import { addPosts, setPosts, updatePostFlag } from "../../features/auth/postSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const postupdateFlag = useSelector((state) => state.posts.isPostStateUpdate);
  console.log('flag in dashboard', postupdateFlag);

  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const feeds = useSelector((state) => state.posts.posts || []);

  const fetchUserFeeds = useCallback(
    async (pageNum = 1, isLoadMore = false) => {
      try {
        if (!hasMore && isLoadMore) {
          console.log("No more feeds to load.");
          return;
        }

        if (isLoadMore) {
          setFetchingMore(true);
        } else {
          setLoading(true);
          if (pageNum === 1) {
            // Reset page and hasMore when fetching first page for a full refresh
            setHasMore(true);
            setPage(1);
          }
        }

        console.log(`Fetching feeds: page=${pageNum}, isLoadMore=${isLoadMore}`);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/post/feeds?page=${pageNum}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );

        const newFeeds = res.data.data.feeds;
        console.log("Fetched new feeds:", newFeeds);

        if (newFeeds.length === 0) {
          setHasMore(false);
        } else {
          if (isLoadMore) {
            dispatch(addPosts(newFeeds));
          } else {
            dispatch(setPosts(newFeeds)); // Replace with fresh data on initial load/flag trigger
          }
          setPage((prev) => pageNum + 1);
        }
      } catch (err) {
        console.error("Failed to fetch feeds", err);
        // Optionally, set hasMore to false if there's an error on initial load
        if (!isLoadMore) setHasMore(false);
      } finally {
        setLoading(false);
        setFetchingMore(false);
      }
    },
    [accessToken, pageSize, hasMore, dispatch]
  );

  // Initial fetch when accessToken is available or changes
  useEffect(() => {
    if (accessToken) {
      console.log("AccessToken available, performing initial feed fetch (or re-fetch).");
      fetchUserFeeds(1, false); // Always reload fresh feed on mount/token change
    }
  }, [accessToken, fetchUserFeeds]);

  // Effect to trigger a re-fetch when postupdateFlag is true
  useEffect(() => {
    if (postupdateFlag) {
      console.log("postupdateFlag is true, re-fetching feeds.");
      fetchUserFeeds(1, false); // Always reload fresh
      dispatch(updatePostFlag(false)); // Reset flag after re-fetch
    }
  }, [postupdateFlag, fetchUserFeeds, dispatch]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Trigger load more when near the bottom (100px threshold)
      if (scrollTop + windowHeight >= fullHeight - 100 && !fetchingMore && hasMore && !loading) {
        console.log("Scrolling near bottom, fetching more feeds.");
        fetchUserFeeds(page, true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchingMore, hasMore, fetchUserFeeds, page, loading]); // Added 'loading' to dependencies

  const stats = [
    { label: 'Active Projects', value: '12', change: '+2 this week', color: 'text-green-600' },
    { label: 'Collaborations', value: '8', change: '+1 this month', color: 'text-blue-600' },
    { label: 'Network Score', value: '94', change: '+5 points', color: 'text-purple-600' },
  ];

  console.log("Feeds from Redux (rendered):", feeds);

  if (loading && feeds.length === 0) {
    return <DashBoardLoader />;
  }

  return (
    <div className="space-y-8 overflow-y-scroll">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-600">Here's what's happening in your network today.</p>
      </div>

      {/* Optional: Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <p className={`text-sm mt-2 ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="space-y-6  ">
          {feeds.length > 0 ? (
            feeds.map((feed) => (
              <PostCard
                key={feed.id} // Ensure 'id' is a stable unique identifier
                feed={feed}
                // No need to pass handleLike, handleComment, handleJoin as props
                // if PostCard handles its own API calls and dispatches updateSinglePost
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No posts available. Start by creating your first post!</p>
            </div>
          )}

          {fetchingMore && (
            <div className="text-center text-gray-500 py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2">Loading more posts...</p>
            </div>
          )}

          {!hasMore && feeds.length > 0 && (
            <div className="text-center text-gray-400 py-6">
              🎉 You've reached the end of your feed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;