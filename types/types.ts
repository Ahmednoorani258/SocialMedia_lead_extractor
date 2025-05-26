export interface User {
  id: string;
  username: string;
  profile_pic_url: string;
  followers: number;
}

export interface Post {
  id: string;
  shortcode: string;
  display_url: string;
  is_video: boolean;
  video_url: string | null;
  caption: string;
  like_count: number;
  timestamp: number;
  accessibility_caption: string;
  owner: User;
  location?: string; // Assuming you'll tag this manually or extract from somewhere
}
