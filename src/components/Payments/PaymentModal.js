import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useMutation } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { CREATE_CHECKOUT_SESSION_MUTATION } from "../Api/resolvers/payment";
import { MessageContext } from "../Contexts/MessageContext";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
  },
  loadingContainer: {
    display: "flex",
    margin: "64px 165px 64px 165px",
  },
  submitButton: {
    display: "flex",
    margin: "auto",
    marginTop: theme.spacing(3),
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
}));

// Get key from .env file
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const PaymentModal = ({ closePaymentModal, paymentModalIsOpen }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const [createCheckoutSession, { data }] = useMutation(
    CREATE_CHECKOUT_SESSION_MUTATION
  );

  const { setMessage } = useContext(MessageContext);
  const { englishSelected } = useContext(LanguageContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("success");
    }
  }, [setMessage, data]);

  const handleOnSubmit = async () => {
    const stripe = await stripePromise;
    setIsLoading(true);

    const { data: response } = await createCheckoutSession();
    const session = await JSON.parse(response.createCheckoutSession.session);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      setMessage("error");
    }
  };

  return (
    <Modal
      className={classes.modal}
      onClose={closePaymentModal}
      open={paymentModalIsOpen}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={paymentModalIsOpen}>
        <div className={classes.paper}>
          {isLoading ? (
            <Box className={classes.loadingContainer} sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h2 align="center" id="transition-modal-title">
                {englishSelected
                  ? "Support website owner"
                  : "Podpoř majitele webu"}
              </h2>
              <hr />
              <p id="transition-modal-description">
                {englishSelected
                  ? "Support the owner of website by buying coffee for only 5$!"
                  : "Podpoř majitele webové aplikace koupi kávy jen za 5$"}
              </p>
              <Button
                className={classes.submitButton}
                onClick={handleOnSubmit}
                size="large"
                variant="contained"
                color="primary"
              >
                {englishSelected ? "Support" : "Podpořit"}
              </Button>
            </>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
