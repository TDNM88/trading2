interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-gray-700">{blog.content.substring(0, 120)}...</p>
      <div className="text-sm text-gray-500 mt-2">
        By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
