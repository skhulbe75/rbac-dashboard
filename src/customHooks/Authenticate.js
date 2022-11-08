import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

const useCustomAuth = (component) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(component);
  const [protectedComponent, setProtectedComponent] = useState(false);

  const toast = useToast();
  const navigate = useHistory();

  const userRole = sessionStorage.getItem("role");
  const userPlan = sessionStorage.getItem("plan");

  let planAccess = false;
  let roleAccess = false;

  useEffect(() => {
    if (authenticatedUser && authenticatedUser.plans) {
      planAccess = authenticatedUser.plans <= userPlan ? true : false;
      roleAccess = authenticatedUser.role <= userRole ? true : false;

      let access = false;
      let displayMsg = "";

      if (planAccess) {
        if (roleAccess) {
          let pathname = authenticatedUser.layout + authenticatedUser.path;
          navigate.push(pathname);
          setProtectedComponent(true);
        } else {
          displayMsg =
            "Your role does not have access to this feature, contact your administration";
          ToastExample(displayMsg);
        }
      } else {
        displayMsg =
          "This feature is not included in your plan Kindly Upgrade.";
        ToastExample(displayMsg);
      }
    }
  }, [authenticatedUser]);

  function ToastExample(displayMsg) {
    return toast({
      title: "Permission Denied",
      description: displayMsg,
      status: "error",
      position: "bottom-left",
      duration: 5000,
      isClosable: true,
    });
  }

  return [protectedComponent, setAuthenticatedUser];
};

export default useCustomAuth;
