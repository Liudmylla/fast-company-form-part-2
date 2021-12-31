const comments = [
  {
    _id: "67rdca3eeb7f6fg",
    pageId: "67rdca3eeb7f6fgeed471815",
    userId: "67rdca3eeb7f6fgeed47181f",
    content: "Как уже неоднократно упомянуто, многие известные личности будут функционально разнесены на независимые элементы.",
    created_at: "1633576399367"
  },
  {
    _id: "67rdca3eeb7f6fgdasd",
    pageId: "67rdca3eeb7f6fgeed471815",
    userId: "67rdca3eeb7f6fgeed471817",
    content: "Следует отметить, что дальнейшее развитие различных форм деятельности не оставляет шанса для кластеризации усилий.",
    created_at: "1633573058520"
  },
  {
    _id: "67rdca3eeb7f6fgdaasd",
    pageId: "67rdca3eeb7f6fgeed471817",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Противоположная точка зрения подразумевает, что представители современных социальных резервов превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.",
    created_at: "1633573058520"
  }
];
if (!localStorage.getItem("comments")) {
  localStorage.setItem("comments", JSON.stringify(comments));
}
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(comments);
    }, 200);
  });

const fetchCommentsForUser = (userId) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("comments")).filter(
          (c) => c.pageId === userId
        )
      );
    }, 200);
  });
const add = (data) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const comments = JSON.parse(localStorage.getItem("comments"));
      const newComment = {
        ...data,
        created_at: Date.now(),
        _id: Math.random().toString(36).substr(2, 9)
      };
      comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
      resolve(newComment);
    }, 200);
  });

const remove = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      const comments = JSON.parse(localStorage.getItem("comments"));
      const newComments = comments.filter((x) => x._id !== id);
      localStorage.setItem("comments", JSON.stringify(newComments));
      resolve(id);
    }, 200);
  });
export default {
  fetchAll,
  fetchCommentsForUser,
  add,
  remove
};
