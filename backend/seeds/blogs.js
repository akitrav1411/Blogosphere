// const generateUniqueUserIds = (userIds = []) => {
//   const [idx1, idx2] = [
//     Math.floor(Math.random() * userIds.length),
//     Math.floor(Math.random() * userIds.length),
//   ];
//   return userIds.slice(Math.min(idx1, idx2), Math.max(idx1, idx2));
// };
const generateUniqueIds = (arr = []) => {
  const [indx1, indx2] = [
    Math.floor(Math.random() * arr.length),
    Math.floor(Math.random() * arr.length),
  ];
  return tagIds.slice(Math.min(indx1, indx2), Math.max(indx1, indx2));
};
const dummyBlogGenerator = (
  blogCount = 10,
  userIdList = [],
  tagIdList = []
) => {
  if (!userIdList.length) return [];
  const blogs = [];
  [...Array(Math.max(blogCount, 1))].map((_, index) => {
    blogs.push({
      title: `Dummy Blog ${index}`,
      createdBy: userIdList[Math.floor(Math.random() * userIdList.length)],
      createdAt: new Date(),
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      likedBy: generateUniqueIds(userIdList),
      tags: generateUniqueIds(tagIdList),
      isPublished: true,
      isDeleted: false,
    });
  });
  return blogs;
};

export default dummyBlogGenerator;
