// api.js
const apiLinks = "https://crystalsolutions.com.pk/malikspicy/";


export const fetchDatamenu = async () => {
  try {
    const response = await fetch(`${apiLinks}/get_item.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};
export const fetchDataAccountCode = async () => {
  try {
    const response = await fetch(`${apiLinks}GetAccount.php`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling code
  }
};



export const fetchDataDelivery = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_delivery.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };
  

export const fetchDataItem = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_item.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };


  export const fetchDataCategory = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_category.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };
//js api


  export const fetchDataUOM = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_uom.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };


  export const fetchDataLocation = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_location.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };

  export const fetchDataMOP = async () => {
    try {
      const response = await fetch(`${apiLinks}/get_payment_mode.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };



  export const fetchDataWaiter = async () => {
    try {
      const response = await fetch(`${apiLinks}/WaiterList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }


      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };


  export const fetchDataTable = async () => {
    try {
      const response = await fetch(`${apiLinks}/TableList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };



  export const fetchDataKitchenList = async () => {
    try {
      const response = await fetch(`${apiLinks}/KitchenOrderList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };


  export const fetchDataPendingOrderList = async () => {
    try {
      const response = await fetch(`${apiLinks}/PendingOrderList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };

  

  export const fetchDataDiningOrderList = async () => {
    try {
      const response = await fetch(`${apiLinks}/DiningOrderList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the calling code
    }
  };



  export const fetchDataCarOrderList = async () => {
    try {
      const response = await fetch(`${apiLinks}/CarOrderList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };


  export const fetchDataDiliveryOrderList = async () => {
    try {
      const response = await fetch(`${apiLinks}/DiliveryOrderList.php`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };