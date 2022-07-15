import React, { useState, useEffect } from "react";
import api from "../data/apiLink";
import network from "../network/axios";
import Tables from "../components/subjectDashboard/table";
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

export default function viewChapters() {
  const row = ["id", "no of subtopics", "no of questions", "created at"];
  const [ques, setques] = useState([]);
  const [message,setmessage] = useState("fetching data from server...")
  useEffect(() => {
    (async () => {
      const subject = window.location.pathname.split("/")[2];
      console.log(subject);
      const url =
        api.get.getAllQuestions + subject.toLowerCase() + "?page=1&limit=5";
      console.log(url);
      const questions = await network.getUrl(url);
      if(questions.result.length==0){
        setmessage("No Data Found")
      }
      console.log(questions);

      if (questions) {
        console.log(questions.result);
        setques(questions.result);
        console.log(ques);
      }
    })();
  }, []);
  const deleteQuestion = async id => {
    const url = api.delete.deleteQuestion + "" + id;
    console.log(url);

    const questions = await network.deleteUrl(url, {});
    console.log(questions);
    if (questions) {
      setques(ques.filter(x => x._id != id));

      alert("successfully deleted");
    } else {
      alert("somehting went wrong");
    }
  };
  return (
    <div className="" style={{ height: "100vh" }}>
      {ques.length > 0 ? (
        ques.map((data, idx) => {
          return (
            <Container key={idx}>
              <ListGroup flush className="mt-5" key={idx}>
                <ListGroupItem className="p-3">
                  <Row form>
                    <Col md="12" className="form-group">
                      <div className="d-flex justify-content-between">
                        <p>
                          <b>{data.topic.name}</b>
                        </p>
                        <Button
                          key={idx}
                          onClick={() => deleteQuestion(data._id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <div>
                        <h5>
                          {idx + 1} {"."} {data.question}
                        </h5>
                      </div>
                      <div>
                        {1} {"."}
                        {data.option1}
                      </div>
                      <div>
                        {2} {"."}
                        {data.option2}
                      </div>
                      <div>
                        {3} {"."}
                        {data.option3}
                      </div>
                      <div>
                        {4} {"."}
                        {data.option4}
                      </div>
                      <div>
                        <b>Correct Answer: </b>
                        {data.correct_answer}
                      </div>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Container>
          );
        })
      ) : (
        <div className="d-flex h-100 justify-content-center align-items-center capitalize">
          <h5>{message}</h5>
        </div>
      )}
    </div>
  );
}
