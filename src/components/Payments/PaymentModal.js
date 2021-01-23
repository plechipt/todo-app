import React, { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { CREATE_CHECKOUT_SESSION_MUTATION } from "../Api/resolvers/payment";
import { MessageContext } from "../Contexts/MessageContext";

import { makeStyles } from "@material-ui/core/styles";
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
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

// Get keys from .env file
const STRIPE_TEST_PUBLIC_KEY = process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY;
const STRIPE_LIVE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_LIVE_PUBLIC_KEY;

const stripePromise = loadStripe(STRIPE_TEST_PUBLIC_KEY);

const PaymentModal = ({ closePaymentModal, paymentModalIsOpen }) => {
  const classes = useStyles();
  const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION_MUTATION);
  const { setMessageFunction } = useContext(MessageContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessageFunction("success");
    }
  }, [setMessageFunction]);

  const handleOnSubmit = async () => {
    const stripe = await stripePromise;

    const { data: response } = await createCheckoutSession();
    const session = await JSON.parse(response.createCheckoutSession.session);

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      setMessageFunction("error");
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
          <h2 align="center" id="transition-modal-title">
            Support website owner
          </h2>
          <hr />
          <p id="transition-modal-description">
            Support the owner of website by buying coffee for only 5$!
          </p>
          <Button
            className={classes.submitButton}
            onClick={handleOnSubmit}
            size="large"
            variant="contained"
            color="primary"
          >
            Support
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
