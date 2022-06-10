import React, { useState, useEffect } from "react";
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
    option1: "aaa",
    option2: "",
    option3: "",
    option4: "",
    hint1: "",
    hint2: "",
    correct_answer: "",
    chapter: "",
    topic: "",
    subject: window.location.pathname.split("/")[2],
    exam: "",
    year: "",
    difficulty: ""
  });
  const [chapter, setchapters] = useState([]);
  const [topic, settopics] = useState([]);

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
  function addOptions(key, value) {
    coptions[key] = value;
    setoptions(coptions);
    console.log(coptions);
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
  return (
    <Container>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row>
                  <Col md="12">
                    <label htmlFor="feEmailAddress">Question</label>
                    <textarea
                      onChange={e => {
                        addOptions("question", e.target.value);
                      }}
                      className="form-group outline-1"
                      type="textarea"
                      name="textarea"
                      style={{ width: "100%", height: "50%" }}
                    />
                  </Col>
                </Row>
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
                  <Col md="6">
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
                </Row>
                <Row form>
                  <Col>
                    <label htmlFor="feEmailAddress">Option 3</label>
                    <FormInput
                      onChange={e => {
                        addOptions("option3", e.target.value);
                      }}
                      id="feEmailAddress"
                      type="text"
                      placeholder="Option 3"
                      Row="5"
                    />
                  </Col>
                  <Col>
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
                    </FormSelect>
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
