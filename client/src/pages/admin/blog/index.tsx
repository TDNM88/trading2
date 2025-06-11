import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../../../components/BlogCard';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Failed to fetch blogs', err));
  }, []);

  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
