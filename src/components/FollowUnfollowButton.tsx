"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { Loader } from './Loader';
import { Loader2 } from 'lucide-react';

interface FollowUnfollowButtonProps {
  targetUserId?: string;
}

const FollowUnfollowButton: React.FC<FollowUnfollowButtonProps> = ({ targetUserId }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/user/follow/status?followingId=${targetUserId}`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    checkFollowStatus();
  }, [session, targetUserId]);

  const handleFollow = async () => {
    try {
      await axios.post('/api/user/follow', { followingId: targetUserId });
      setIsFollowing(true);
    } catch (error) {

    }
  };
  const handleUnfollow = async () => {
    try {
      await axios.post('/api/user/unfollow', { followingId: targetUserId });
      setIsFollowing(false);
    } catch (error) {

    }
  };

  if (loading) {
    return <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />;
  }

  if (!session) {
    return <Button disabled>Follow</Button>;
  }

  return (
    <button
    className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
      isFollowing ? 'bg-zinc-500 text-white border-zinc-500' : 'bg-transparent border-zinc-600 text-zinc-600 hover:bg-zinc-600 hover:text-white'
    }`}
    onClick={isFollowing ? handleUnfollow : handleFollow}
  >
    {isFollowing ? 'Following' : '+ Follow'}
  </button>
  
  
  );
};

export default FollowUnfollowButton;
