// import React, { createContext, useState } from 'react';

// export const TotalResponsesContext = createContext();

// export const TotalResponsesProvider = ({ children }) => {
//   const [totalResponses, setTotalResponses] = useState(0);

//   return (
//     <TotalResponsesContext.Provider value={{ totalResponses, setTotalResponses }}>
//       {children}
//     </TotalResponsesContext.Provider>
//   );
// };


import React, { createContext, useState } from 'react';

export const TotalResponsesContext = createContext();

export const TotalResponsesProvider = ({ children }) => {
  const [totalResponses, setTotalResponses] = useState(0);
  const [totalLeaveRequest, settotalLeaveRequest] = useState(0); // Add this line

  return (
    <TotalResponsesContext.Provider value={{ totalResponses, setTotalResponses, totalLeaveRequest, settotalLeaveRequest }}>
      {children}
    </TotalResponsesContext.Provider>
  );
};
