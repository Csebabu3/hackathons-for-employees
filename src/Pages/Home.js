import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Badge, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import './Home.css'
import { AiOutlinePullRequest } from "react-icons/ai";

const validate = (values) => {
  const errors = {};
  if (!values.Title) {
    errors.Title = "*Required";
  }
  if (!values.Description) {
    errors.Description = "*Required";
  }
  if (!values.Tags) {
    errors.Tags = "*Required";
  }
  return errors;
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortingByVote, setIsSortingByVote] = useState(false);

  const [challenges, setChallenges] = useState([]);
  const [vote, setVote] = useState({}); // Use an object to store votes for each challenge
  const [modalValues, setModalValues] = useState({
    Title: '',
    Description: '',
    Tags: '',
  });

  const handleAddChallengeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddChallenge = (newChallenge) => {
    setChallenges([newChallenge, ...challenges]);
    setVote({ ...vote, [challenges.length]: 0 });
  };

  const formik = useFormik({
    initialValues: {
      Title: "",
      Description: "",
      Tags: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission logic here
      const newChallenge = {
        Title: values.Title,
        Description: values.Description,
        Tags: values.Tags,
      };
      handleAddChallenge(newChallenge);
      // setChallenges([...challenges, newChallenge]); // Update challenges array
      // setVote({ ...vote, [challenges.length]: 0 }); // Initialize vote count for the new challenge
      setModalValues(newChallenge); // Set modal input values to state
      resetForm();
      handleCloseModal();
    },
  });

  const handleVote = (index) => {
    setVote((prevVote) => ({
      ...prevVote,
      [index]: (prevVote[index] || 0) + 1,
    }));
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  const sortedChallenges = challenges.slice().sort((a, b) => {
    const voteCountA = vote[challenges.indexOf(a)] || 0;
    const voteCountB = vote[challenges.indexOf(b)] || 0;
  
    if (isSortingByVote) {
      return voteCountB - voteCountA; // Sort in descending order based on vote count
    } else {
      return challenges.indexOf(a) - challenges.indexOf(b); // Maintain the original order
    }
  });
  
  const handleSortByVoteClick = () => {
    setIsSortingByVote((prevSorting) => !prevSorting);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light shadow p-4 mb-4 bg-white">
        <div className="container-fluid d-flex gap-4">
          <p><b>Filter : Vote Count : <AiOutlinePullRequest style={{cursor:"pointer"}} onClick={handleSortByVoteClick}/></b></p>
          <p><b>Create Date : <AiOutlinePullRequest style={{cursor:"pointer"}} /></b></p>
          <Button className="ms-auto btn btn-warning fw-bolder" onClick={handleAddChallengeClick}>
            Add New Challenges
          </Button>
        </div>
      </nav>
      <div className='container1'>
        {sortedChallenges.map((challenge, index) => (
          <Card key={index} className="w-75 mb-3">
            <Card.Body>
              <h4>Add New Challenges</h4>
              <h5 className="card-title"><p><b>Title :</b></p>{challenge.Title}</h5>
              <p className="card-text"><p><b>Description :</b></p>{challenge.Description}</p>
              {/* <p><b>Creation Date:</b> {formatDate(challenge.createdAt)}</p> */}
              <p><b>Current Date:</b> {formatDate(new Date())}</p>
              <div className='d-flex'>
                <p className='me-2'><b>Upvote</b></p>
                <span className='vote me-2' style={{ cursor: 'pointer' }} onClick={() => handleVote(index)}>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </span>
                <p>Vote Count: {vote[index] || 0}</p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal show={isModalOpen} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column gap-4'>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <TextField
                id="Title"
                name="Title"
                label="Title"
                variant="outlined"
                fullWidth
                value={formik.values.Title}
                onChange={formik.handleChange}
                error={formik.touched.Title && Boolean(formik.errors.Title)}
                helperText={formik.touched.Title && formik.errors.Title}
              />
            </div>
            <div className="mb-3">
              <TextField
                id="Description"
                name="Description"
                label="Description"
                variant="outlined"
                fullWidth
                value={formik.values.Description}
                onChange={formik.handleChange}
                error={formik.touched.Description && Boolean(formik.errors.Description)}
                helperText={formik.touched.Description && formik.errors.Description}
              />
            </div>
            <div className="mb-3">
              <TextField
                id="Tags"
                name="Tags"
                label="Tags"
                variant="outlined"
                fullWidth
                value={formik.values.Tags}
                onChange={formik.handleChange}
                error={formik.touched.Tags && Boolean(formik.errors.Tags)}
                helperText={formik.touched.Tags && formik.errors.Tags}
              />
            </div>
            <Button variant="secondary" className='btn btn-danger' onClick={handleCloseModal}>
              Close
            </Button>
            <Button type="submit" variant="primary" className='btn btn-warning'>
              Create Challenges
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
