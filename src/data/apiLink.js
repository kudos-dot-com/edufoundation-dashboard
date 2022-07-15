import base from "./baseurl";
const api = {
  //GET
  get: {
    getChapters: base + "/chapter/chapter/",
    getChaptersTopic: base + "/chapter/chapter/topic/",
    getTopics: base + "/topic/",
    getAllQuestions:base + '/question/get/'
    },

  //POST
  post: {
    bulkUpload:base+"/question/bulkupload",
    apiChapter: base + "/chapter/add",
    // topica
    apiTopic: base + "/topic/add",
    //Questions
    apiQ: base + "/question/add"
  },
  delete:{
    deleteQuestion: base + "/question/delete/"
  }
};

export default api;
