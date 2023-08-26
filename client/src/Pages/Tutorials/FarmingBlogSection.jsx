import React from 'react';

const BlogCard = ({ title, date, content, image }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-md">
      <img className="w-full h-32 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">{date}</p>
        <p className="text-gray-700 text-sm">{content}</p>
        <a
          href="#"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

const FarmingBlogSection = () => {
  const blogPosts = [
    {
        title: "The Importance of Soil Health",
        date: "August 15, 2023",
        content: "Discover why maintaining healthy soil is crucial for successful farming and how you can improve your soil's quality.",
        image: "https://bloximages.chicago2.vip.townnews.com/agupdate.com/content/tncms/assets/v3/editorial/2/7d/27d25f62-e85b-5116-9627-c4995e5813d4/5ae731935681e.preview.jpg?resize=1200%2C675",
      },
      {
        title: "Companion Planting Guide",
        date: "July 25, 2023",
        content: "Learn about the benefits of companion planting and how to choose the right plant combinations to enhance your crop growth.",
        image: "https://livelovefruit.com/wp-content/uploads/2019/04/companion-planting-chart-FB-01.jpg",
      },
      {
          title: "10 Tips for Efficient Irrigation",
          date: "September 5, 2023",
          content: "Discover practical strategies for effective irrigation to ensure your crops receive the right amount of water while conserving this precious resource.",
          image: "https://th.bing.com/th/id/OIP.bG6tBiwPUrJRgP-sX06cNgHaEM?pid=ImgDet&rs=1",
      },
      {
          title: "Managing Pests Naturally",
          date: "October 10, 2023",
          content: "Learn about natural methods to control pests on your farm, such as using beneficial insects, trap crops, and cultural practices.",
          image: "https://www.mymove.com/wp-content/uploads/2020/07/Organic-Pest-Control-Spray.jpg",
      },
      {
        title: "The Importance of Soil Health",
        date: "August 15, 2023",
        content: "Discover why maintaining healthy soil is crucial for successful farming and how you can improve your soil's quality.",
        image: "https://bloximages.chicago2.vip.townnews.com/agupdate.com/content/tncms/assets/v3/editorial/2/7d/27d25f62-e85b-5116-9627-c4995e5813d4/5ae731935681e.preview.jpg?resize=1200%2C675",
      },
      {
        title: "Companion Planting Guide",
        date: "July 25, 2023",
        content: "Learn about the benefits of companion planting and how to choose the right plant combinations to enhance your crop growth.",
        image: "https://livelovefruit.com/wp-content/uploads/2019/04/companion-planting-chart-FB-01.jpg",
      },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            title={post.title}
            date={post.date}
            content={post.content}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FarmingBlogSection;
