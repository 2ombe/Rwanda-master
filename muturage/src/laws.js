const laws = [
  {
    chapterI: {
      articleI: ["Gihazo", "Karama", "Ngoma", "Rebezo", "Rugarama"],

      ArticleII: [
        "Amarembo",
        "Bwiza",
        "Gatoro",
        "Kabeza",
        "Kiruhura",
        "Rubimba",
      ],

      chapterII: ["Bwiza", "Byimana", "Ituze", "Kanserege", "Kinunga"],
    },
  },
];

const traverse = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const newObj = {};
      value.forEach((article) => {
        newObj[article] = article;
      });
      obj[key] = newObj;
    } else {
      traverse(value);
    }
  });
};
traverse(laws);

export default laws;
