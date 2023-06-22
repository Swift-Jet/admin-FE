// import React from 'react';
// import { Route, redirect } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <redirect to="/sign-up" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (JSON.parse(localStorage.getItem("authenticated")) != true) {
    return <Navigate to="/sign-up" replace />;
  }
  return children;
};
export default ProtectedRoute;
