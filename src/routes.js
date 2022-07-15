import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views

import Subject from "./views/subject";
import AddTopics from './views/addTopic'

import AddChapters from './views/addChapters'
import AddQuestions from './views/addQuestions'
import viewChapters from './views/viewChapters'
import Bulk from './views/bulkUpload'
import viewQuestions from './views/viewQuestions'
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },

  {
    path: "/subject/physics",
    layout: DefaultLayout,
    component: Subject
  },
  {
    path: "/add-topics/physics/",
    layout: DefaultLayout,
    component: AddTopics
  },
  {
    path: "/add-chapters/physics/",
    layout: DefaultLayout,
    component: AddChapters
  },
  {
    path: "/add-questions/physics/",
    layout: DefaultLayout,
    component: AddQuestions
  },{
    path: "/view-chapters/physics",
    layout: DefaultLayout,
    component: viewChapters
  },
  {
    path: "/view-questions/physics",
    layout: DefaultLayout,
    component: viewQuestions
  },
  {
    path: "/bulk-upload/physics",
    layout: DefaultLayout,
    component: Bulk
  },
  // chemistry
  {
    path: "/subject/chemistry",
    layout: DefaultLayout,
    component: Subject
  },
  {
    path: "/add-topics/chemistry/",
    layout: DefaultLayout,
    component: AddTopics
  },
  {
    path: "/add-chapters/chemistry",
    layout: DefaultLayout,
    component: AddChapters
  },{
    path: "/add-questions/chemistry",
    layout: DefaultLayout,
    component: AddQuestions
  },
  {
    path: "/bulk-upload/chemistry",
    layout: DefaultLayout,
    component: Bulk
  },{
    path: "/view-chapters/chemistry",
    layout: DefaultLayout,
    component: viewChapters
  },{
    path: "/view-questions/chemistry",
    layout: DefaultLayout,
    component: Subject
  },
  // biology
  {
    path: "/subject/biology",
    layout: DefaultLayout,
    component: Subject
  },
  {
    path: "/add-topics/biology/",
    layout: DefaultLayout,
    component: AddTopics
  },
  {
    path: "/add-chapters/biology/",
    layout: DefaultLayout,
    component: AddChapters
  },{
    path: "/add-questions/biology/",
    layout: DefaultLayout,
    component: AddQuestions
  },
  {
    path: "/bulk-upload/biology",
    layout: DefaultLayout,
    component: Bulk
  },
  {
    path: "/view-chapters/biology/",
    layout: DefaultLayout,
    component: viewChapters
  },
   {
    path: "/subject/mathematics",
    layout: DefaultLayout,
    component: Subject
  },
    {
    path: "/add-topics/mathematics/",
    layout: DefaultLayout,
    component: AddTopics
  },
  {
    path: "/add-chapters/mathematics/",
    layout: DefaultLayout,
    component: AddChapters
  },{
    path: "/add-questions/mathematics/",
    layout: DefaultLayout,
    component: AddQuestions
  },
  {
    path: "/view-chapters/mathematics",
    layout: DefaultLayout,
    component: viewChapters
  },
  {
    path: "/bulk-upload/mathematics",
    layout: DefaultLayout,
    component: Bulk
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },





  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
