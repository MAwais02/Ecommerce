import React from "react";
import { StepLabel, Stepper, Typography, Step } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Import for Shipping Icon
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'; // Import for Confirm Order Icon
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Import for Payment Icon
import "./Checkoutsteps.css";

const CheckoutSteps = ({ activeSteps }) => {
    const steps = [
        {
            label: <Typography className="stepLabel">Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography className="stepLabel">Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography className="stepLabel">Payment</Typography>,
            icon: <AccountBalanceIcon />
        }
    ];

    return (
        <div className="stepper">
            <Stepper alternativeLabel activeStep={activeSteps}>
                {steps.map((item, index) => (
                    <Step key={index} completed={activeSteps > index}>
                        <StepLabel
                            icon={item.icon}
                            className={activeSteps === index ? "activeStep" : (activeSteps > index ? "completed" : "")}>
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default CheckoutSteps;
