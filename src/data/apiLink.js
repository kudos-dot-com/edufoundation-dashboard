import base from "./baseurl";
const api = {
  //GET
  get: {
    getChapters: base + "/chapter/chapter/",
    getChaptersTopic: base + "/chapter/chapter/topic/",
    apiPhy:
      "https://edu-foundation-kudos-dot-com.vercel.app/api/chapter/chapter/physics",
    apiMath:
      "https://edu-foundation-kudos-dot-com.vercel.app/api/chapter/chapter/mathematics",
    apiBio:
      "https://edu-foundation-kudos-dot-com.vercel.app/api/chapter/chapter/biology",
    apiChem:
      "https://edu-foundation-kudos-dot-com.vercel.app/api/chapter/chapter/chemistry",

    apiQues:
      "https://edu-foundation-bnqyscf9q-kudos-dot-com.vercel.app/api/question/getchapter/:subject/:chapter?page=1&limit=10",
    getTopics: base + "/topic/",
    },

  //POST
  post: {
    apiChapter: base + "/chapter/add",
    // topica
    apiTopic: base + "/topic/add",
    //Questions
    apiQ: base + "/question/add"
  }
};

export default api;
