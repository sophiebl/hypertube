import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Player from "../Player";

const ModalPlayer = ({
  showModal,
  setShowModal,
  movieRequest,
  setMovieRequest,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setMovieRequest({
            torrentUrl: null,
            provider: null,
            quality: null,
            imdbId: null,
          });
        }}
        dialogClassName="modalwidth"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Play the movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Player movieRequest={movieRequest} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPlayer;
