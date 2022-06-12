import React, { useState, useEffect, useRef } from "react";
import storage from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import api from "../data/apiLink";
// import {useLocation} from 'react-router-dom'
import network from "../network/axios";
export default function CompleteFormExample() {
  const [coptions, setoptions] = useState({
    question: "",
    questionImage: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option1Image: "",
    option2Image: "",
    option3Image: "",
    option4Image: "",
    hint1: "",
    hint2: "",
    correct_answer: [],
    chapter: "",
    topic: "",
    subject: window.location.pathname.split("/")[2].toLowerCase(),
    exam: "",
    year: "",
    difficulty: ""
  });
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);
  const [chapter, setchapters] = useState([]);
  const [topic, settopics] = useState([]);
  const [answers, setanswers] = useState([]);
  const [options, setcardoptions] = useState([]);
  const [text, settext] = useState("submit");

  useEffect(() => {
    // console.log(useLocation())
    (async () => {
      const subject = window.location.pathname.split("/")[2];
      console.log(subject);
      const url = api.get.getChaptersTopic + subject.toLowerCase() + "/";
      console.log(url);
      const chapters = await network.getUrl(url);
      console.log(chapters);

      if (chapters) {
        // console.log(chapters.result)
        setchapters(chapters.result);
        console.log(chapter);
      }
      console.log(chapter);
    })();

    // constr url = api.get.apiQues.replace(':subject',subject).replace(':chapter',coptions.chapter)
  }, []);

  const handleUpload = async(key,value) => {
    console.log(value);
    setProgressShow(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(storage, `/images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      error => {
        alert("error while uploading the image! check internet connection ")
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          // handleInputState(name, url);
          coptions[key] = url;
          setoptions(coptions);
          console.log(coptions);
          console.log(url);
        });
      }
    );
  };

  const handleAnswerUpload = async() => {
    if(coptions.questionImage!== "")
    {
      const question = await handleUpload('question',coptions.question) 
    }
    else
    {
      alert("question not uploaded")
    }

    if(coptions.option1Image!== "")
    {
      const question = await handleUpload('option1Image',coptions.option1Image)  
    }
   
    if(coptions.option2Image!== "")
    {
      const question = await handleUpload('option2Image',coptions.option2Image) 
    }

    if(coptions.option3Image!== "")
    {
      const question = await handleUpload('option3Image',coptions.option3Image)  
    }

    if(coptions.option4Image!== "")
    {
      const question = await handleUpload('option4Image',coptions.option4Image) 
    }

    


  };
  function addOptions(key, value) {
    settext("submit");
    coptions[key] = value;
    setoptions(coptions);
    console.log(coptions);
    if (key == "correct_answer" && coptions[value] !== "") {
      if (value !== "" && options.indexOf(value) == -1) {
        let newArr = [];
        newArr = [coptions[value], ...answers];
        setanswers(newArr);
        coptions[key] = newArr;
        setoptions(coptions);

        newArr = [...options, value];
        setcardoptions(newArr);
      } else {
        coptions[key] = answers;
        setoptions(coptions);
      }
    }

    if (key == "topic") {
      let findTopic = chapter.find(x => x.topic == value);
      console.log(findTopic);
      coptions["chapter"] = findTopic.chapters[0];
      setoptions(coptions);

      settopics(findTopic.chapters);
    }
  }
  async function handleSubmit(e) {
    // e.preventDefault();
    console.log(coptions);
    settext("submitting...");
    const url = api.post.apiQ;
    const result = await network.postUrl(url, coptions);
    console.log(result);
    settext("submit");
    alert(result.message);
  }
  async function deleteOptions(data) {
    let deleteData = options.filter(x => x !== data);
    setcardoptions(deleteData);
  }
  return (
    <Container>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
              <label htmlFor="feEmailAddress">Question</label>
               
                <Row>
                  <textarea
                  row="5"
                  style={{widht:'100%',height:'70px'}}
                  placeholder="enter question"
                   onChange={e => addOptions('question',e.currentTarget.files[0])}
                  >
                    
                  </textarea>
                  <Col md="6">
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={e => addOptions('questionImage',e.currentTarget.files[0])}
                        className="custom-file-input"
                        id="customFile2"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile2"
                      >
                        Choose file...
                      </label>
                       {progressShow && progress < 100 && (
                       alert('uploading')
                      )}
                      
                    </div>
                    {coptions.question!==""?<Col md="6">
                  
                  <h5>upload done</h5>
             
               </Col>:""}
                  </Col>
                  
                </Row>
                {/* options */}
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Option 1</label>
                    <FormInput
                      onChange={e => {
                        addOptions("option1", e.target.value);
                      }}
                      id="feEmailAddress"
                      type="text"
                      placeholder="Option 1"
                      Row="5"
                    />
                  </Col>
                  <Col md="3">
                  <label htmlFor="feEmailAddress">Option1 Image Upload</label>
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={e => addOptions('option1Image',e.currentTarget.files[0])}
                        className="custom-file-input"
                        id="customFile2"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile2"
                      >
                        Choose file...
                      </label>
                      
                      
                    </div>
                  </Col>

                </Row>
                
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Option 2</label>
                    <FormInput
                      onChange={e => {
                        addOptions("option2", e.target.value);
                      }}
                      id="feEmailAddress"
                      type="text"
                      placeholder="Option 2"
                      Row="5"
                    />
                  </Col>
                  <Col md="3">
                  <label htmlFor="feEmailAddress">Option2 Image Upload</label>
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={e => addOptions('option2Image',e.currentTarget.files[0])}
                        className="custom-file-input"
                        id="customFile2"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile2"
                      >
                        Choose file...
                      </label>
                    
                      
                    </div>
                  </Col>
                  
                </Row>

                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Option 3</label>
                    <FormInput
                      onChange={e => {
                        addOptions("option3", e.target.value);
                      }}
                      id="feEmailAddress"
                      type="text"
                      placeholder="Option 2"
                      Row="5"
                    />
                  </Col>
                  <Col md="3">
                  <label htmlFor="feEmailAddress">Option3 Image Upload</label>
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={e => addOptions('option3Image',e.currentTarget.files[0])}
                        className="custom-file-input"
                        id="customFile2"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile2"
                      >
                        Choose file...
                      </label>
                      
                      
                    </div>
                  </Col>
                  
                </Row>

                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmailAddress">Option 4</label>
                    <FormInput
                      onChange={e => {
                        addOptions("option4", e.target.value);
                      }}
                      id="feEmailAddress"
                      type="text"
                      placeholder="Option 4"
                      Row="5"
                    />
                  </Col>
                  <Col md="3">
                  <label htmlFor="feEmailAddress">Option4 Image Upload</label>
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={e => addOptions('option4Image',e.currentTarget.files[0])}
                        className="custom-file-input"
                        id="customFile2"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile2"
                      >
                        Choose file...
                      </label>
                       
                    </div>
                  </Col>
                  <Col md="3">
                  
                    </Col>
                </Row>

                {/* options section end */}
                <Row Form>
                  <Button className="mx-3 my-2" outline size='lg' onClick={(e)=>handleAnswerUpload()}>Upload</Button>
                   
                    {progressShow && progress < 100 && (
                        <div className="my-3">
                          <h5>uploading ...</h5>
                        </div>
                      )}
                  {progress === 100 && (
                        <div className="my-3">
                          <h5>upload done!</h5>
                        </div>
                      )}    
                </Row>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feInputState">Correct Option</label>
                    <FormSelect
                      id="feInputState"
                      onChange={e => {
                        addOptions("correct_answer", e.target.value);
                      }}
                    >
                      <option>Choose...</option>
                      <option>option1</option>
                      <option>option2</option>
                      <option>option3</option>
                      <option>option4</option>
                      <option>option1Image</option>
                      <option>option2Image</option>
                      <option>option3Image</option>
                      <option>option4Image</option>{" "}
                    </FormSelect>
                  </Col>
                </Row>

                <Row form>
                  {options.length > 0 ? (
                    <label>Your Selected Answers</label>
                  ) : (
                    ""
                  )}
                  <Col md="12" className="form-group d-flex">
                    {options.map((data, idx) => {
                      return (
                        <Button
                          onClick={e => {
                            deleteOptions(data);
                          }}
                          className="mx-1"
                          outline
                          size="sm"
                          key={idx}
                        >
                          {data}
                        </Button>
                      );
                    })}
                  </Col>
                </Row>
                <Row Form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">Topics</label>
                    <FormSelect
                      id="feInputState"
                      onChange={e => {
                        addOptions("topic", e.target.value);
                      }}
                    >
                      {chapter ? (
                        chapter.map((data, idx) => {
                          return <option>{data.topic}</option>;
                        })
                      ) : (
                        <option>Choose...</option>
                      )}
                    </FormSelect>
                  </Col>

                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">subtopic</label>
                    <FormSelect
                      id="feInputState"
                      onChange={e => {
                        addOptions("chapter", e.target.value);
                      }}
                    >
                      {chapter ? (
                        topic.map((data, idx) => {
                          return <option>{data}</option>;
                        })
                      ) : (
                        <option>Choose...</option>
                      )}
                    </FormSelect>
                  </Col>
                </Row>

                <FormGroup>
                  <label htmlFor="feInputAddress">Hint 1</label>
                  <FormInput
                    id="feInputAddress"
                    onChange={e => {
                      addOptions("hint", e.target.value);
                    }}
                    placeholder="Add A Hint"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="feInputAddress2">Hint 2</label>
                  <FormInput
                    onChange={e => {
                      addOptions("hint2", e.target.value);
                    }}
                    id="feInputAddress2"
                    placeholder="Add Another Hint"
                  />
                </FormGroup>
               
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">Difficulty Level</label>
                    <FormSelect
                      id="feInputState"
                      onChange={e => {
                        addOptions("difficulty", e.target.value);
                      }}
                    >
                      <option>Choose...</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </FormSelect>
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="feInputState">Exam Type</label>
                    <FormSelect
                      id="feInputState"
                      onChange={e => {
                        addOptions("exam", e.target.value);
                      }}
                    >
                      <option>JEE MAIN</option>
                      <option>NEET</option>
                      <option>JEE ADVANCE</option>
                      <option>WBJEE</option>
                    </FormSelect>
                  </Col>
                  <Col md="2" className="form-group">
                    <label htmlFor="feInputZip">Year</label>
                    <FormInput
                      onChange={e => {
                        addOptions("year", e.target.value);
                      }}
                      id="feInputEmail"
                      type="text"
                      placeholder="year"
                    />
                  </Col>

                  <Col md="4">
                    <CustomFileUpload />
                  </Col>
                </Row>
                <Button
                  onClick={e => {
                    handleSubmit();
                  }}
                >
                  {text}
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Container>
  );
}
