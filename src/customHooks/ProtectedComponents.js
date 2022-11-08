import { useState, useEffect } from "react";

const useProtection = (component) => {
  const [protectedComponent, setProtectedComponent] = useState(component);
  const [componentAccess, setComponentAccess] = useState(false);

  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
    if (protectedComponent && protectedComponent.role) {
      let access = protectedComponent.role <= userRole ? true : false;
      if (access) {
        setComponentAccess(true);
      }
    }
  }, [protectedComponent]);

  return [componentAccess, setProtectedComponent];
};

export default useProtection;
