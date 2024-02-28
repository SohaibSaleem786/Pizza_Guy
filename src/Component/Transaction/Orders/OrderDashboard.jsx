import ReactToPrint from "react-to-print";
import Print from "../../../image/print.png";
import React, { useState, useEffect, useRef, ref } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Modal from "react-bootstrap/Modal";
import { Card, Row, Col, Button, InputGroup } from "react-bootstrap";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useTheme } from "../../../ThemeContext";
import Bin from "../../../image/bin.png";
import Typography from "@mui/material/Typography";
import "../Orders/OrderDashbored.css";
import Receipt from "../print/Receipt";
import CategoryCard from "./Category_Card/Category_Card.jsx";
import OrderDeliveryModal from "./Modal/Delivery_Modal.jsx";
import DiningOrderModal from "./Modal/Dining_Modal.jsx";
import CheckoutModal from "./CheckoutModal/Checkoutmodal.jsx";
import CarOrderModal from "./Modal/Car_Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  fetchDelivery,
  fetchItem,
  fetchKitchen,
  fetchTable,
  fetchWaiter,
  updateKitchenData,
  fetchPendingOrderlist,
  fetchDiningOrderList,
  fetchCarOrderList,
  fetchDeliveryOrderList,
} from "../../../Redux/Action.js";

const Order_Dashboard = () => {
  const dispatch = useDispatch();
  const categorydata = useSelector((state) => state.category);
  const tabledata = useSelector((state) => state.table);
  const itemdata = useSelector((state) => state.item);
  const waiterdata = useSelector((state) => state.waiter);
  const deliverydata = useSelector((state) => state.delivery);
  const PendingOrderListdata = useSelector((state) => state.pendingOrderList);
  const DiningOrderListdata = useSelector((state) => state.diningOrderList);
  const CarOrderListdata = useSelector((state) => state.carOrderList);
  const DeliveryOrderListdata = useSelector((state) => state.deliveryOrderList);
  useEffect(() => {
    dispatch(fetchKitchen());
    dispatch(fetchTable());
    dispatch(fetchCategory());
    dispatch(fetchItem());
    dispatch(fetchWaiter());
    dispatch(fetchDelivery());
    dispatch(fetchPendingOrderlist());
    dispatch(fetchDiningOrderList());
    dispatch(fetchCarOrderList());
    dispatch(fetchDeliveryOrderList());
  }, [dispatch]);
  const [newOrderData, setNewOrderData] = useState(0);
  const navigate = useNavigate();
  const ref = useRef();
  const [searchText, setSearchText] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [rowNumber, setRowNumber] = useState(0); // Initialize row number
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [getUser, setUser] = useState();
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////  CATEGORY FUNCTION  ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const [data1, setData1] = useState();
  const [selectedTableIdd, setSelectedTableIddd] = useState();
  const [selectedwaiiiIdd, setSelectedwaaaaaIddd] = useState();
  const [getTable, setDataTable] = useState([]);
  const [selectedWaiterId, setSelectedWaiterId] = useState();
  const [getWaiter, setDataWaiter] = useState([]);
  const [showOrderList, setShowOrderList] = useState(true);
  const [getorderlist, setorderlist] = useState({ columns: [], rows: [] });
  const [datadining, setDatadining] = useState([]);
  const [dataCar, setDataCar] = useState([]);
  const [dataDelivery, setDataDelivery] = useState([]);

  const handleWaiterChange1 = (waiterId) => {
    console.log("selectedWaiterId===", selectedWaiterId);
    console.log("waiterId", waiterId);
    setSelectedWaiterId(waiterId);
    console.log("selectedWaiterId", selectedWaiterId);
  };
  const handleTableChange1 = (tableId) => {
    setSelectedwaaaaaIddd(tableId);
  };

  useEffect(() => {
    if (categorydata && categorydata.data) {
      setData1(categorydata?.data);
    }
    if (tabledata && tabledata.data) {
      setDataTable(tabledata.data);
    }
    if (waiterdata && waiterdata.data) {
      setDataWaiter(waiterdata.data);
    }
    if (PendingOrderListdata && PendingOrderListdata.data) {
      const transformedData = PendingOrderListdata.data.map((item) => ({
        id: item.id,
        tcstnam: item.tcstnam,
        tmobnum: item.tmobnum,
        w_name: item.w_name,
        dvdsc: item.dvdsc,
        totalAmt: item.totalAmt,
      }));
      const columns = [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "torddat", sort: "asc" },
        { label: "Mobile", field: "tordtim", sort: "asc" },
        { label: "W_Name", field: "tordadd", sort: "asc" },
        { label: "Type", field: "tmobnum", sort: "asc" },
        { label: "Amount", field: "tordamt", sort: "asc" },
        { label: "Show", field: "tordamt", sort: "asc" },
        { label: "Add", field: "tordamt", sort: "asc" },
        { label: "Print", field: "tordamt", sort: "asc" },
      ];

      setorderlist({ columns, rows: transformedData });
      setLength(PendingOrderListdata.data.length);
    }
    if (DiningOrderListdata && DiningOrderListdata.data) {
      setDatadining(DiningOrderListdata.data);
    }
    if (CarOrderListdata && CarOrderListdata.data) {
      setDataCar(CarOrderListdata.data);
    }
    if (DeliveryOrderListdata && DeliveryOrderListdata.data) {
      setDataDelivery(DeliveryOrderListdata.data);
    }
  }, [
    categorydata,
    tabledata,
    waiterdata,
    PendingOrderListdata,
    DiningOrderListdata,
    CarOrderListdata,
    DeliveryOrderListdata,
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      console.log(userData);
      fetchMenuItems(); 
      console.log("user id is", userData.id);
    } else {
      console.error("User data not available in local storage.");
    }
  }, []);
  const [getpayable, setnetpayable] = useState([]);
  const [tamtItems, settamtItems] = useState([]);
  const [totalItem, settotalItem] = useState([]);
  const [detailItem, setDetailItem] = useState([]);
  const [Length, setLength] = useState("");
  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  ////////////////QUANTITY /////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  const [filteredDataItem, setFilteredDataItem] = useState([]);


  const handleQuantityChange = (itemIndex, newValue) => {
    const updatedData = [...filteredDataItem];
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      updatedData[itemIndex].quantity = parsedValue;
      setFilteredDataItem(updatedData);
    }
  };

  const handleDecrement = (itemIndex) => {
    const updatedData = [...filteredDataItem];
    if (updatedData[itemIndex].quantity > 0) {
      updatedData[itemIndex].quantity -= 1;
      setFilteredDataItem(updatedData);
    }
  };

  const handleIncrement = (itemIndex) => {
    const updatedData = [...filteredDataItem];
    updatedData[itemIndex].quantity += 1;
    setFilteredDataItem(updatedData);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  //////////////////////  CART ITEM FUNCTION  ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const fetchMenuItems = () => {
    const apiUrl = `${apiLinks}/Cart_Item.php`;
    const formData = new URLSearchParams({
      orderid: newOrderData?.id,
    }).toString();

    axios
      .post(apiUrl, formData)
      .then((response) => {
        setTableData({
          columns: [], 
          rows: response.data.detail, 
        });
        setnetpayable(response.data.payable.toLocaleString());
        settamtItems(response.data.totalAmt.toLocaleString());
        settotalItem(response.data.totalitem);
        setDetailItem(response.data.detail);
        console.log("sdfsfsafasdf", response.data.detail.length);
        console.log("titm total amt ", response.data.detail);
      })
      .catch((error) => {
      });
  };
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const filteredRows = detailItem
    ? detailItem.filter((item) =>
        item.titmdsc.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  //////////////////// DELETE ITEM api ////////////////////////
  ///////////////////////////////////////////////////////////
  const [tableData, setTableData] = useState({ columns: [], rows: [] });

  const [showModal, setShowModal] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState();
  const handleImageClick = (itemId) => {
    setSelectedItemId(itemId);
    handleShowModal(); // Show the delete confirmation modal
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteItem = () => {
    setfilteredRowsss((prevItems) =>
      prevItems.filter((item) => item.itemid !== selectedItemId)
    );
    handleClose();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////  ITEM FUNCTION  ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const [dataItem, setDataItem] = useState({ columns: [], rows: [] });
  const [categoryId, setCategoryId] = useState(null);
  const imageurlitem = `${apiLinks}/itemimage/`;

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
  };

  useEffect(() => {
    // Fetch categories
    fetch(`${apiLinks}/get_category.php`)
      .then((response) => response.json())
      .then((apiData) => {
        // Set categoryId to the ID of the first category
        if (apiData.length > 0) {
          console.log("===================================");
          console.log(apiData[0].tctgid);
          setCategoryId(apiData[0].tctgid);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (itemdata && itemdata.data) {
      const filteredData = itemdata?.data.filter(
        (item) => item.TCtgId === categoryId
      );
      const transformedData = filteredData.map((item) => ({
        TItmId: item.TItmId,
        TItmDsc: item.TItmDsc,
        uom: item.uom,
        TItmSts: item.TItmSts,
        TPurRat: item.TPurRat,
        TSalRat: item.TSalRat,
        TCtgId: item.TCtgId,
        TitmTyp: item.TitmTyp,
        TItmPic: item.TItmPic,
        itmdis: item.itmdis,
        quantity: 1.0,
      }));
      setDataItem({ rows: transformedData });
      setFilteredDataItem(transformedData);
    }
  }, [categoryId]);

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  ////////////////////////   Modals    //////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleNewOrderClick = (name, mobile) => {
    setNewOrderData("---");
    setDataOrderTypeeee1("1");
    setShowDeliveryModal(false);
    setName(name);
    setMobile(mobile);
    console.log("Name:", name);
    console.log("Mobile:", mobile);
  };
  const handleNewOrderClickCar = (name) => {
    setNewOrderData("---");
    setName(name);
    setShowCarModal(false);    
    setDataOrderTypeeee1("1");

  };
  const handleNewOrderClickdining = () => {
    setDataOrderTypeeee1("1");
    setNewOrderData("---");
    setfilteredRowsss([]);
    console.log("sdfsfs", selectedwaiiiIdd);
    setName(selectedwaiiiIdd);
    setMobile("");
    setShowDiningModal(false);
  };

  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const handleShowDeliveryModal = () => {
    setShowDeliveryModal(true);
  };
  const handleDeliveryClose = () => {
    console.log("close the delivery modal");

    setShowDeliveryModal(false);
  };

  const [showDiningModal, setShowDiningModal] = useState(false);

  const handleShowDiningModal = () => {
    // setfilteredRowsss([]);
    //   setNewOrderData([]);
    setShowDiningModal(true);
  };

  const handleDiningClose = () => {
    setShowDiningModal(false);
    resetTableNumber();
  };

  const [showCarModal, setShowCarModal] = useState(false);

  const handleShowCarModal = () => {
    setShowCarModal(true);
  };
  const handleCarClose = () => {
    // setSelectedWaiterId('');

    // setNewOrderData(newOrderData?.id);
    console.log("close the car modal", newOrderData?.id);
    setShowCarModal(false);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////  ADD TO CART ////////////////////////////
  const [filteredRowsss, setfilteredRowsss] = useState([]);
  const handleRemarksChange = (index, remarks) => {
    setfilteredRowsss((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], remarks };
      return updatedRows;
    });
  };
  const [totalAmountCart, setTotalAmountCart] = useState(0);
  const [totalQuantityCart, setTotalQuantityCart] = useState(0);

  const handleQuantityChange111 = (index, newQuantity) => {
    setfilteredRowsss((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, qty: newQuantity, total: newQuantity * item.saleRate }
          : item
      )
    );
  };

  useEffect(() => {
    const totalAmount = filteredRowsss.reduce(
      (accumulator, item) => accumulator + item.total,
      0
    );

    const totalQuantity = filteredRowsss.reduce(
      (accumulator, item) => accumulator + parseInt(item.qty, 10) || 0,
      0
    );

    setTotalQuantityCart(totalQuantity);
    setTotalAmountCart(totalAmount);
  }, [filteredRowsss]);

  function handleAddToCart(item) {
    const { quantity } = item;

    // Check if the item with the same itemid is already in the cart
    const existingItemIndex = filteredRowsss.findIndex(
      (cartItem) => cartItem.itemid === item.TItmId
    );

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update the quantity
      const updatedItems = [...filteredRowsss];
      updatedItems[existingItemIndex].qty += quantity;
      updatedItems[existingItemIndex].total =
        updatedItems[existingItemIndex].qty * item.TSalRat;

      setfilteredRowsss(updatedItems);
    } else {
      // If the item is not in the cart, add it as a new item
      const total = quantity * item.TSalRat;

      const data = {
        itemid: item.TItmId,
        itemDec: item.TItmDsc,
        purRate: item.TPurRat,
        saleRate: item.TSalRat,
        disRate: item.itmdis,
        total: total,
        qty: quantity,
      };

      setfilteredRowsss((prevItems) => [...prevItems, data]);
    }

    console.log("totalAmountsdsad", totalAmount);
  }

  const handleItemClick = (item) => {
    // Move the logic for adding items to the cart here
    handleAddToCart(item);
  };

  //////////////////////////////////////////////////////////////////////////
  /////////////////////////      ORDER TYPE         //////////////////////////
  ////////////////////////   NEW ORDER GENERATE    //////////////////////////////
  ///////////////////////  DELEIVERY ORDER  ,,, DINING ORDER    /////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [lastOrderId, setLastOrderId] = useState(null);

  const [values, setValues] = useState({
    descriptionitem: "",
    namee: "",
    mobilee: "",
    tablee: "",
    priceDiscount: "",
    percentageDiscount: "",
    perDicAmtt: "",
    loading: false,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };

  const [dataOrderType, setDataOrderTypeeee] = useState("2");
  const [dataOrderType1, setDataOrderTypeeee1] = useState("1");

  const handleButtonClick1 = () => {
    setDataOrderTypeeee1(dataOrderType1 === "1" ? "2" : "1");
    setDataOrderTypeeee("2");
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setDataOrderTypeeee1("1");
    if (selectedRow === row.id) {
      setShowOrderList(!showOrderList);
      // setDataOrderTypeeee(showOrderList ? "1" : "2");
      setDataOrderTypeeee1("1");

      // setNewOrderData(row);
    } else {
      setSelectedRow(row.id);
      setShowOrderList(true);
      setDataOrderTypeeee1("1");
      setNewOrderData(row);
    }
  };

  const showcartitemlist = (row) => {
    setDataOrderTypeeee("2");
    setDataOrderTypeeee1("1");
    if (selectedRow === row.id) {
      setShowOrderList(!showOrderList);
      // setDataOrderTypeee(showOrderList ? "1" : "2");
      setDataOrderTypeeee("2");
      setDataOrderTypeeee1("1");
      // setNewOrderData(row);
    } else {
      setSelectedRow(row.id);
      setShowOrderList(true);
      setDataOrderTypeeee("2");
      setDataOrderTypeeee1("1");
      setNewOrderData(row);
    }
  };
  const showitemsandadditem = (row) => {
    console.log("order id shwofsdf");
    setDataOrderTypeeee("3");
    if (selectedRow === row.id) {
      setShowOrderList(!showOrderList);
      // setDataOrderTypeeee(showOrderList ? "1" : "2");
      setDataOrderTypeeee("3");
      // setNewOrderData(row);
    } else {
      setSelectedRow(row.id);
      setShowOrderList(true);
      setDataOrderTypeeee("3");
      setNewOrderData(row);
    }
  };

  useEffect(() => {
    if (newOrderData && newOrderData.id) {
      console.log(newOrderData.id, "newOrderData shwofsdf");
    }
    fetchMenuItems();
    dispatch(fetchPendingOrderlist());
  }, [newOrderData]);

  const resetTableNumber = () => {
    setSelectedTableIddd("");
  };

  const customScrollbarStyle = `
    ::-webkit-scrollbar {
      width: 0px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
  `;

  ////////////////////////////////////////////  print modal////////////////////

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [getmovedata, setmovedatatorecipe] = useState([]);

  const handleShowPrintModal = (row) => {
    fetchMenuItems();
    setNewOrderData(row);
    setmovedatatorecipe(row);
    console.log("row showOrderListshowOrderList", row.id);
  };
  const receiptRef = useRef(); // Use useRef instead of React.createRef

  const handlePrintClose = () => {
    //////// jab ma print modal close kro ga wab mara automatically reset ho ji ga
    setPriceDiscount(0);
    setPercentageDiscount(0);
    setTotalAmount(0);
    setShowPrintModal(false);
  };

  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////  show minus plus data in print ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setTotalAmount(tamtItems);
  }, [tamtItems]);
  // const [getpricepercentagediscount, setpicepercentagediscount] = useState("");

  const [perDicAmtt, setPerDicAmt] = useState("");

  const [priceDiscount, setPriceDiscount] = useState(0);
  const [percentageDiscount, setPercentageDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(tamtItems);

  const [showPrice, setShowPrice] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const handleToggle = (type) => {
    if (type === "price") {
      setShowPrice(true);
      setShowPercentage(false);
    } else if (type === "percentage") {
      setShowPrice(false);
      setShowPercentage(true);
    }
  };
  const [discountType, setDiscountType] = useState("fixed"); // 'fixed' or 'percentage'
  const [discountValue, setDiscountValue] = useState(0);
  const [getdiscountamount, setdiscountamount] = useState("0");

  const handleSubmit = () => {
    const numberInt = parseInt(tamtItems.replace(/,/g, ""), 10);
    let totalAfterDiscount = 0;

    if (discountType === "fixed") {
      if (discountValue < 0) {
        setAlertData({
          type: "error",
          message: "Negative value is not Acceptable",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        return; // Exit early if percentage value is invalid
      }
      totalAfterDiscount = numberInt - discountValue;
      setdiscountamount(discountValue);
    } else {
      const percentageAmount = (discountValue / 100) * numberInt;

      if (discountValue > 100) {
        setAlertData({
          type: "error",
          message: "Percentage value must be 100 or less.",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        return; // Exit early if percentage value is invalid
      } else if (discountValue < 0) {
        setAlertData({
          type: "error",
          message: "Negative value is not Acceptable",
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        return; // Exit early if percentage value is invalid
      }

      setdiscountamount(percentageAmount);
      totalAfterDiscount = numberInt - percentageAmount;
    }

    setTotalAmount(totalAfterDiscount);
  };

  const [selectedCategory1, setSelectedCategory1] = useState("1");

  const [buttonLabel, setButtonLabel] = useState("Delivery");
  const handleButtonClickmodal = () => {
    if (selectedCategory1 === "1") {
      handleShowDeliveryModal();
    } else if (selectedCategory1 === "2") {
      handleShowDiningModal();
    } else if (selectedCategory1 === "4") {
      handleShowCarModal();
    }
  };
  const handleRadioChange1 = (e) => {
    setSelectedCategory1(e.target.value);
    if (e.target.value === "1") {
      setButtonLabel("Delivery");
      handleShowDeliveryModal();
    } else if (e.target.value === "2") {
      setButtonLabel("Dining");
      handleShowDiningModal();
    } else if (e.target.value === "4") {
      setButtonLabel("Car");
      handleShowCarModal();
    }
  };
  /////////////////////////////substracted amount from the taken amount //////////////////////////////////
  const [enteredAmount, setEnteredAmount] = useState(0);

  const [subtractedValue, setSubtractedValue] = useState(0);

  const handleAmountChange1 = (event) => {
    const { value } = event.target;
    setEnteredAmount(value);
    calculateSubtractedValue(value); // Call calculateSubtractedValue on amount change
  };

  const calculateSubtractedValue = (enteredAmount) => {
    const tamtItemsInt = parseInt(String(getpayable).replace(/,/g, ""), 10);

    // Check if tamtItemsInt is a valid number
    if (!isNaN(tamtItemsInt)) {
      const subsractedvalue = tamtItemsInt - enteredAmount;
      console.log("subtractedValue", subsractedvalue);
      setSubtractedValue(subsractedvalue);
      console.log("tamtItems", tamtItemsInt);
      console.log("enteredAmount", enteredAmount);
    } else {
    }
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////  4 button in foter ////////////////////////////
  const buttonStyles = {
    backgroundColor: "#f4511e",
    height: "35px",
    border: "none",
    opacity: "0.8",
    fontWeight: "bold",
    fontSize: "13px",
    width: "100%",
    color: "black",
  };

  const buttonTexts = [
    "Move to Orders ==>>",
    "<<== Move to Item",
    "Move to Orders ==>>",
    "Move to Orders ==>>",
    "Move to Orders ==>>",
    "Move to Orders ==>>",
  ];

  const ResetButton = () => {
    setEnteredAmount(0);
    setDiscountValue("");
    setfilteredRowsss([]);
    setNewOrderData([]);
    setSubtractedValue(0);
  };

  /////////////////////////////////////////////////  Dining List

  const tableCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
  };

  /////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleShowCheckoutModal = () => {
    console.log("handleShowCheckoutModal");

    dispatch(fetchDiningOrderList());
    dispatch(fetchCarOrderList());
    dispatch(fetchDeliveryOrderList());
    setShowCheckoutModal(true);
  };
  const handleCheckoutClose = () => {
    console.log("handleCheckoutClose");
    setfilteredRowsss([]);
    setShowCheckoutModal(false);
    // setShowCheckoutModal(false);
    setDataOrderTypeeee("2");
    dispatch(fetchDiningOrderList());
    dispatch(fetchCarOrderList());
    dispatch(fetchPendingOrderlist());
    dispatch(fetchDeliveryOrderList());
  };
  const setShowCheckoutModalfun = () => {
    console.log("close the setShowCheckoutModalfun delivery modal");
    handleCheckoutClose();
    setShowCheckoutModal(false);
  };

  const savebuttonourdata = async (filteredRowsss, newOrderData) => {
    dispatch(fetchKitchen());
    console.log("savebuttonourdata savebuttonourdata");
    // item.preventDefault();

    const { quantity } = filteredRowsss;
    setValues({
      loading: false,
      // Add other default values as needed
    });
    try {
      if (!newOrderData) {
        setAlertData({
          type: "error",
          message: "You need to first check the orderid",
        });
        return; // Exit the function early
      }
      // Prepare the data to be sent in the request
      const requestData = {
        ordtyp: selectedCategory1,
        waiter: selectedWaiterId,
        table: selectedwaiiiIdd,
        name: name,
        mobile: mobile,
        // car_numbar: values.namee,
        userid: getUser.id,
        shfid: getUser.shfid,
        detail1: filteredRowsss.map((item) => {
          const total = item.qty * item.saleRate;

          return {
            itemid: item.itemid,
            itemDec: item.itemDec,
            purRate: item.purRate,
            saleRate: item.saleRate,
            disRate: item.disRate,
            qty: item.qty,
            total: total,
            // orderid: item.orderid,
            // userid: item.userid,
            remarks: item.remarks,
          };
        }),
      };

      console.log("total amount", totalAmount);
      // setfilteredRowsss((prevItems) => [...prevItems, requestData.detail1]);
      const response = await axios.post(
        `${apiLinks}/Order.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log(requestData);
      console.log("tablel id", selectedTableIdd);
      setNewOrderData(response.data);
      setfilteredRowsss([]);
      console.log("add to save button click ", newOrderData);
      if (response.data.error === 200) {
        // setNewOrderData(response.data.orderId);
        setDiscountValue("");

        dispatch(fetchCarOrderList());
        dispatch(fetchDiningOrderList());
        dispatch(fetchDeliveryOrderList());
        // navigate("/MainPage");
        setfilteredRowsss([]);
        dispatch(fetchPendingOrderlist());

        console.log(
          response.data.message,
          "add to save button click ",
          newOrderData
        );
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        // console.log(response.data.message);

        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (newOrderData !== null) {
      console.log("New order data:", newOrderData);
    }
  }, [newOrderData]);
  const addtocartbuttonupdatedata = async (filteredRowsss) => {
    dispatch(fetchKitchen());
    console.log("addtocartbuttonupdatedata", newOrderData.id);

    const { quantity } = filteredRowsss;
    setValues({
      loading: false,
      // Add other default values as needed
    });
    try {
      if (newOrderData && newOrderData.id === null) {
        setAlertData({
          type: "error",
          message: "You need to first check the orderid",
        });
        return; // Exit the function early
      }
      // Prepare the data to be sent in the request
      const requestData = {
        orderid: newOrderData.id,

        detail1: filteredRowsss.map((item) => {
          const total = item.qty * item.saleRate;

          return {
            itemid: item.itemid,
            itemDec: item.itemDec,
            purRate: item.purRate,
            saleRate: item.saleRate,
            disRate: item.disRate,
            qty: item.qty,
            total: total,
            remarks: item.remarks,
          };
        }),
      };

      console.log("newOrderData.id newOrderData.id", newOrderData.id);

      const response = await axios.post(
        `${apiLinks}/Add_Cart.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log(requestData);
      console.log("tablel id", selectedTableIdd);

      if (response.data.error === 200) {
        dispatch(fetchCarOrderList());
        dispatch(fetchDiningOrderList());
        dispatch(fetchDeliveryOrderList());
        fetchMenuItems();
        dispatch(fetchPendingOrderlist());
        setDiscountValue("");

        setfilteredRowsss([]);
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          dispatch(fetchPendingOrderlist());
        }, 1000);
      } else if (response.data.error === 404) {
        setAlertData({
          type: "error",
          message: "You need to check the type of order",
        });
        setTimeout(() => {
          setAlertData(null);
          dispatch(fetchPendingOrderlist());
        }, 1000);
        return; // Exit the function early
      } else {
        dispatch(fetchCarOrderList());
        dispatch(fetchDiningOrderList());
        dispatch(fetchDeliveryOrderList());
        fetchMenuItems();
        dispatch(fetchPendingOrderlist());
        setfilteredRowsss([]);
        console.log(response.data.message);

        setAlertData({
          type: "error",
          message: `${response.data.error}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const receiveCarOrderValues = (values) => {
    setName(values.namee);
    console.log("valuesvaluesvalues", values.namee);
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}

        <PathHead
          pageName="Transaction > Order Dashboard"
          screen="Get_Item"
          pageLink="/MainPage"
        />

        <div className="row">
          <div className="col-4">
            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  textAlign: "center",
                  fontSize: "11px",
                  margin: "12px",
                }}
              >
                <FormControl
                  component="fieldset"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <RadioGroup
                    aria-label="categoryIdd"
                    name="categoryIdd"
                    value={selectedCategory1}
                    onChange={handleRadioChange1}
                    style={{ flexDirection: "row" }}
                  >
                    <Row>
                      {[1, 2, 3, 4].map((value) => (
                        <Col key={value} xs={2} sm={2} md={2} lg={2} xl={2}>
                          <FormControlLabel
                            value={value.toString()}
                            control={<Radio />}
                            label={
                              <Typography
                                variant="body2"
                                style={{ fontSize: "12px" }}
                                className={
                                  selectedCategory1 === value.toString()
                                    ? "selected-label"
                                    : ""
                                }
                              >
                                {value === 1 && "Delivery"}
                                {value === 2 && "Dining"}
                                {value === 3 && "T_Away"}
                                {value === 4 && "Car"}
                              </Typography>
                            }
                          />
                        </Col>
                      ))}
                      <Col
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        style={{
                          textAlign: "center",
                          fontSize: "11px",
                        }}
                      >
                        <Button onClick={handleButtonClickmodal}>
                          {buttonLabel}
                        </Button>
                      </Col>
                    </Row>
                  </RadioGroup>
                </FormControl>
              </Col>

              {/* //////////////////////DELEIVERY ORDER///////////////////////////////////////// */}
              <OrderDeliveryModal
                show={showDeliveryModal}
                onHide={handleDeliveryClose}
                handleNewOrderClick={handleNewOrderClick}
                getWaiter={getWaiter}
                handleWaiterChange1={handleWaiterChange1}
              />

              {/* //////////////////////DINING ORDER///////////////////////////////////////// */}

              <DiningOrderModal
                show={showDiningModal}
                onHide={handleDiningClose}
                handleNewOrderClick={handleNewOrderClickdining}
                getWaiter={getWaiter}
                handleWaiterChange1={handleWaiterChange1}
                getTable={getTable}
                handleTableChange1={handleTableChange1}
              />
              {/* //////////////////////CAR ORDER///////////////////////////////////////// */}
              <CarOrderModal
                show={showCarModal}
                onHide={handleCarClose}
                handleNewOrderClickCar={handleNewOrderClickCar}
                getWaiter={getWaiter}
                handleWaiterChange1={handleWaiterChange1}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                selectedWaiterId={selectedWaiterId}
                receiveCarOrderValues={receiveCarOrderValues} // Pass the function as a prop
              />
            </Row>
            {/* JSON VARIABLE WITH  */}
            {dataOrderType === "2" && (
              <div
                style={{
                  overflowY: "scroll",
                  fontSize: "12px",
                  overflow: "hidden",
                }}
              >
                <style>{customScrollbarStyle}</style>
                <MDBTable
                  scrollY
                  maxHeight="77vh"
                  striped
                  bordered
                  small
                  responsive
                >
                  <MDBTableHead>
                    <tr
                      style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "60px", // Adjust width as needed
                        }}
                      >
                        Delete
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "150px", // Adjust width as needed
                        }}
                      >
                        Item
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "100px", // Adjust width as needed
                        }}
                      >
                        Price
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "10px", // Adjust width as needed
                        }}
                      >
                        Qnt
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "90px",
                        }}
                      >
                        Total
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          width: "60px", // Adjust width as needed
                        }}
                      >
                        Remarks
                      </th>
                    </tr>
                  </MDBTableHead>

                  <MDBTableBody>
                    {filteredRowsss.map((item, index) => {
                      const row = {
                        rowNumber: rowNumber + index + 1, // Calculate row number
                        ...item, // Include other row data
                      };

                      return (
                        <tr key={index}>
                          <td>
                            <img
                              onClick={() => handleImageClick(item.itemid)}
                              src={Bin}
                              alt="delete"
                              style={{ width: "15px", height: "12px" }}
                            />
                          </td>
                          <td style={{ width: "100%", textAlign: "left" }}>
                            {item.itemDec}
                          </td>
                          <td>{item.saleRate}</td>
                          <td>
                            <input
                              type="number"
                              style={{ width: "50px", textAlign: "center" }}
                              value={item.qty}
                              onChange={(e) =>
                                handleQuantityChange111(index, e.target.value)
                              }
                            />
                          </td>
                          <td>{item.total}</td>
                          <td>
                            <input
                              type="remarks"
                              style={{ width: "50px", textAlign: "center" }}
                              value={item.remarks}
                              onChange={(e) =>
                                handleRemarksChange(index, e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}

                    {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 33
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 6,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}

                    {/* //////////////////////////////////////// DELETE MODAL //////////////////////////// */}
                    <Modal
                      show={showModal}
                      onHide={handleClose}
                      centered
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.1) !important",
                      }}
                    >
                      <Modal.Header
                        closeButton
                        style={{ backgroundColor: "#ac1e1e", color: "white" }}
                      >
                        <Modal.Title>Deleted!</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>Are you sure you want to delete this item?</p>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          No
                        </Button>
                        <Button variant="danger" onClick={handleDeleteItem}>
                          Yes, Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </MDBTableBody>
                  <MDBTableFoot
                    style={{ position: "sticky", bottom: 0, zIndex: 8 }}
                  >
                    <tr>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      ></th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          textAlign: "center",
                        }}
                      >
                        <button
                          style={{
                            width: "50%",
                            backgroundColor: secondaryColor,
                            color: primaryColor,
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => {
                            if (newOrderData === "---") {
                              savebuttonourdata(filteredRowsss, newOrderData);
                            } else {
                              addtocartbuttonupdatedata(filteredRowsss);
                            }
                          }}

                          // onClick={() =>
                          //        newOrderData && newOrderData.id
                          //     ? addtocartbuttonupdatedata(filteredRowsss)
                          //     : savebuttonourdata(filteredRowsss)
                          // }
                        >
                          Save
                        </button>
                      </th>

                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      ></th>

                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      >
                        {totalQuantityCart}
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      >
                        {totalAmountCart}
                      </th>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      ></th>
                    </tr>
                  </MDBTableFoot>
                </MDBTable>
              </div>
            )}
            {dataOrderType === "3" && (
              // cart item table
              <>
                <div
                  style={{
                    overflowY: "scroll",
                    fontSize: "12px",
                    overflow: "hidden",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <MDBTable
                    scrollY
                    maxHeight="65vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr
                        style={{
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "150px", // Adjust width as needed
                          }}
                        >
                          Sr.
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "150px", // Adjust width as needed
                          }}
                        >
                          Item
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "100px", // Adjust width as needed
                          }}
                        >
                          Price
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "50px", // Adjust width as needed
                          }}
                        >
                          Qnt
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            width: "90px",
                          }}
                        >
                          Total
                        </th>
                      </tr>
                    </MDBTableHead>

                    <MDBTableBody>
                      {filteredRows.map((item, index) => {
                        const row = {
                          rowNumber: rowNumber + index + 1, // Calculate row number
                          ...item, // Include other row data
                        };

                        return (
                          <tr key={index}>
                            <td style={{ width: "1%" }}>{index + 1}</td>
                            <td style={{ width: "100%", textAlign: "left" }}>
                              {item.titmdsc}
                            </td>
                            <td>{item.tsalrat}</td>
                            <td>{item.titmqnt}</td>
                            <td>{item.salamt}</td>
                            {/* <td>
                            <img
                              onClick={() => handleImageClick(item.id)}
                              src={Bin}
                              alt="delete"
                              style={{ width: "15px", height: "12px" }}
                            />
                          </td> */}
                          </tr>
                        );
                      })}

                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 5,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </MDBTableBody>
                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        ></th>

                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          {totalItem}
                        </th>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          {" "}
                          {tamtItems}
                        </th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
                </div>

                <div
                  className="row fixed-bottom"
                  style={{ marginBottom: "15.3vh", marginRight: "67%" }}
                >
                  <div className="col-7">
                    <table>
                      <tbody style={{ textAlign: "right" }}>
                        <tr>
                          <td>
                            <button
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontSize: "12px",
                                height: "30px",
                                width: "100%",
                                border: "none",
                                borderRadius: "5px",
                                background: showPrice ? "green" : primaryColor, // Change background color if showPrice is true
                              }}
                              onClick={() => {
                                handleToggle("price");
                                setDiscountType("fixed");
                              }}
                            >
                              Fixed
                            </button>
                          </td>

                          <td>
                            <button
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontSize: "12px",
                                height: "30px",
                                width: "100%",
                                border: "none",
                                borderRadius: "5px",
                                background: showPercentage
                                  ? "green"
                                  : primaryColor,
                              }}
                              onClick={() => {
                                handleToggle("percentage");
                                setDiscountType("percentage");
                              }}
                            >
                              Percentage
                            </button>
                          </td>

                          <td>
                            <input
                              type="number"
                              style={{ width: "80px", textAlign: "center" }}
                              value={discountValue}
                              onChange={(e) => setDiscountValue(e.target.value)}
                              placeholder={
                                discountType === "fixed"
                                  ? "Enter fixed discount"
                                  : "Enter percentage discount"
                              }
                            />
                          </td>
                          <td>
                            <button onClick={handleSubmit}>Calculate</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-4 offset-1">
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#f4511e",
                        height: "35px",
                        border: "none",
                        opacity: "0.8",
                        fontWeight: "bold",
                        fontSize: "13px",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Payable : {totalAmount}
                    </button>
                  </div>
                </div>
                <div
                  className="row fixed-bottom"
                  style={{ marginBottom: "9.5vh", marginRight: "67%" }}
                >
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      placeholder="Amount Return"
                      disabled={true}
                      style={{
                        border: "none",
                        backgroundColor: "blue",
                        height: "35px",
                        fontSize: "16px",
                        color: "white",
                        opacity: "0.7",
                        width: "100%",
                      }}
                    >
                      Amount Return: {subtractedValue}
                    </button>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      value={enteredAmount}
                      onChange={handleAmountChange1}
                      placeholder="Amount Taken"
                      className="btn btn-primary"
                      style={{
                        border: "none",
                        backgroundColor: "blue",
                        height: "35px",
                        fontSize: "16px",
                        fontWeight: primaryColor,
                        color: "white",
                        opacity: "0.6",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="row fixed-bottom"
                  style={{ marginBottom: "4vh", marginRight: "67%" }}
                >
                  <div className="col-9">
                    <button
                      onClick={handleShowCheckoutModal}
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#f4511e",
                        height: "35px",
                        border: "none",
                        opacity: "0.8",
                        fontWeight: "bold",
                        fontSize: "13px",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <CheckoutModal
                    totalItem={totalItem}
                    tamtItems={tamtItems}
                    getpayable={getpayable}
                    getdiscountamount={getdiscountamount}
                    totalAmount={totalAmount}
                    show={showCheckoutModal}
                    onHide={handleCheckoutClose}
                    orderid={newOrderData.id}
                    setShowCheckoutModalfun={setShowCheckoutModalfun}
                    // setShowCheckoutModal(false);
                  />
                  <div className="col-3">
                    <button
                      className="btn btn-primary"
                      onClick={ResetButton}
                      style={{
                        backgroundColor: "red",
                        height: "35px",
                        border: "none",
                        opacity: "0.8",
                        fontWeight: "bold",
                        fontSize: "13px",
                        width: "100%",
                        color: "white",
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-8">
            {/* category or item ka code */}
            {dataOrderType1 === "1" && (
              <>
                <div className="row">
                  <div
                    className="col-3"
                    style={{
                      maxHeight: "85vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <style>{customScrollbarStyle}</style>
                    <br />
                    <Row>
                      {categorydata.data && (
                        <Row>
                          {categorydata.data.map((item) => (
                            <Col
                              key={item.tctgid}
                              xs={12}
                              sm={12}
                              md={12}
                              lg={6}
                              xl={6}
                            >
                              <CategoryCard
                                categoryId={item}
                                handleCategoryClick={handleCategoryClick}
                                isSelected={categoryId === item.tctgid}
                              />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </Row>
                  </div>

                  <div
                    className="col-9"
                    style={{
                      maxHeight: "85vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <br />
                    <div
                      className={`cards ${
                        filteredDataItem.length > 0
                          ? "cards-large"
                          : "cards-small"
                      }`}
                    >
                      <Row xs={12} sm={6} md={4} lg={3} xl={3}>
                        {filteredDataItem.map((row, index) => (
                          <Col
                            key={index}
                            style={{ marginBottom: "15px" }}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={3}
                          >
                            <Card
                              style={{
                                width: "110%", // Adjust the width to fill the entire column
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              }}
                              className="hover-card" // Add a custom class for hover effect
                              onClick={(e) => {
                                if (!e.target.matches("input")) {
                                  // Exclude input field from click
                                  handleItemClick(row);
                                }
                              }}
                            >
                              <Card.Img
                                variant="top"
                                height="80"
                                src={imageurlitem + row.TItmPic}
                              />
                              <Card.Body
                                style={{
                                  backgroundColor: secondaryColor,
                                  color: primaryColor,
                                }}
                              >
                                <Card.Title
                                  style={{
                                    textAlign: "center",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    height: "22px",
                                  }}
                                >
                                  {row.TItmDsc}
                                </Card.Title>
                                <Card.Title
                                  style={{
                                    textAlign: "center",
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {row.TSalRat} PKR
                                </Card.Title>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      backgroundColor: primaryColor,
                                      color: secondaryColor,
                                      borderRadius: "50%",
                                      marginRight: "10px",
                                      minWidth: "0",
                                      padding: "0",
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent event propagation
                                      handleDecrement(index);
                                    }}
                                  >
                                    -
                                  </Button>

                                  <input
                                    value={row.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      width: "50px",
                                      fontSize: "11px",
                                      marginRight: "10px",
                                      textAlign: "center",
                                      height: "30px",
                                      padding: "0", // Remove any default padding
                                    }}
                                  />
                                  <Button
                                    variant="contained"
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      backgroundColor: primaryColor,
                                      color: secondaryColor,
                                      borderRadius: "50%",
                                      minWidth: "0",
                                      padding: "0",
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent event propagation
                                      handleIncrement(index);
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* //card item table and print code */}
            {dataOrderType1 === "2" && (
              <div>
                <br />
                <div
                  style={{
                    // maxHeight: "78vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    fontSize: "11px",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <MDBTable
                    scrollY
                    maxHeight="81vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr>
                        {getorderlist.columns.map((column, columnIndex) => (
                          <th
                            key={columnIndex}
                            style={{
                              backgroundColor: primaryColor,
                              color: secondaryColor,
                              fontWeight: "bold",
                              position: "sticky",
                              top: -1,
                              zIndex: 1,
                            }}
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {getorderlist.rows.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, columnIndex) => (
                            <td
                              onDoubleClick={() => handleRowClick(row)}
                              key={columnIndex}
                              style={{
                                textAlign:
                                  columnIndex === 1 || columnIndex === 3
                                    ? "left"
                                    : columnIndex === 3
                                    ? "right"
                                    : "center",
                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "20%"
                                    : columnIndex === 2
                                    ? "3%"
                                    : "auto",
                              }}
                            >
                              {value}
                            </td>
                          ))}
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showitemsandadditem(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Show Data
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showcartitemlist(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Add Item
                            </button>
                          </td>
                          {/* Print icon in the last column */}

                          <td>
                            <ReactToPrint
                              bodyClass="print-receipt"
                              content={() => ref && ref.current} // Make sure you define and pass a ref
                              trigger={() => (
                                <div>
                                  <img
                                    onClick={() => handleShowPrintModal(row)}
                                    src={Print}
                                    alt="Print"
                                    style={{ height: "3vh", width: "60%" }}
                                  />
                                </div>
                              )}
                            />
                          </td>
                        </tr>
                      ))}

                      <div style={{ display: "none" }}>
                        <Receipt
                          newOrderData={newOrderData}
                          ref={ref}
                          detailItem={detailItem}
                          // tamtItems={tamtItems}
                          // totalItem={totalItem}
                          priceDiscount={priceDiscount}
                          percentageDiscount={percentageDiscount}
                          totalAmount={totalAmount}
                        />
                      </div>

                      {/* Display blank rows to fill up to 91vh */}
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: getorderlist.columns.length,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </MDBTableBody>

                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          colSpan={9}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        >
                          {Length}
                        </th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
                </div>
              </div>
            )}
            {dataOrderType1 === "4" && (
              // dning list

              <div
                style={{
                  overflowY: "scroll",
                  fontSize: "10px",
                  overflow: "hidden",
                }}
              >
                <style>{customScrollbarStyle}</style>
                <br />
                <br />

                <div
                  style={{
                    // maxHeight: "78vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    fontSize: "11px",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <MDBTable
                    scrollY
                    maxHeight="81vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr>
                        <th style={tableCellStyle}>ID</th>
                        <th style={tableCellStyle}>Order Id</th>
                        <th style={tableCellStyle}>Table No</th>
                        <th style={tableCellStyle}>Waiter</th>
                        <th style={tableCellStyle}>Amount</th>
                        <th style={tableCellStyle}>Show Data</th>
                        <th style={tableCellStyle}>Add Item</th>
                        <th style={tableCellStyle}>Print</th>
                        {/* <th style={tableCellStyle}>Edit</th> */}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {datadining.map((row, index) => (
                        <tr key={index}>
                          <td style={{ width: "1%" }}>{index + 1}</td>
                          <td style={{ width: "10%" }}>{row.id}</td>
                          <td style={{ width: "15%" }}>{row.tcstnam}</td>
                          <td style={{ textAlign: "left", width: "20%" }}>
                            {row.w_name}
                          </td>
                          <td>{row.totalAmt}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showitemsandadditem(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Show Data
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showcartitemlist(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Add Item
                            </button>
                          </td>
                          {/* Print icon in the last column */}

                          <td>
                            <ReactToPrint
                              bodyClass="print-receipt"
                              content={() => ref && ref.current} // Make sure you define and pass a ref
                              trigger={() => (
                                <div>
                                  <img
                                    onClick={() => handleShowPrintModal(row)}
                                    src={Print}
                                    alt="Print"
                                    style={{ height: "3vh", width: "60%" }}
                                  />
                                </div>
                              )}
                            />
                          </td>
                        </tr>
                      ))}

                      <div style={{ display: "none" }}>
                        <Receipt
                          newOrderData={newOrderData}
                          ref={ref}
                          detailItem={detailItem}
                          // tamtItems={tamtItems}
                          // totalItem={totalItem}
                          priceDiscount={priceDiscount}
                          percentageDiscount={percentageDiscount}
                          totalAmount={totalAmount}
                        />
                      </div>

                      {/* Display blank rows to fill up to 91vh */}
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 8,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </MDBTableBody>

                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          {datadining.length}
                        </th>
                        <th
                          colSpan={9}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        ></th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
                </div>
              </div>
            )}
            {dataOrderType1 === "5" && (
              // car list table
              <div
                style={{
                  overflowY: "scroll",
                  fontSize: "10px",
                  overflow: "hidden",
                }}
              >
                <style>{customScrollbarStyle}</style>
                <br />
                <br />

                <div
                  style={{
                    // maxHeight: "78vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    fontSize: "11px",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <MDBTable
                    scrollY
                    maxHeight="81vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr>
                        <th style={tableCellStyle}>ID</th>
                        <th style={tableCellStyle}>Order Id</th>
                        <th style={tableCellStyle}>Table No</th>
                        <th style={tableCellStyle}>Waiter</th>
                        <th style={tableCellStyle}>Amount</th>
                        <th style={tableCellStyle}>Show Data</th>
                        <th style={tableCellStyle}>Add Item</th>
                        <th style={tableCellStyle}>Print</th>
                        {/* <th style={tableCellStyle}>Edit</th> */}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {dataCar.map((row, index) => (
                        <tr key={index}>
                          <td style={{ width: "1%" }}>{index + 1}</td>
                          <td style={{ width: "10%" }}>{row.id}</td>
                          <td style={{ width: "15%" }}>{row.tcstnam}</td>
                          <td style={{ textAlign: "left", width: "20%" }}>
                            {row.w_name}
                          </td>
                          <td>{row.totalAmt}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showitemsandadditem(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Show Data
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showcartitemlist(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Add Item
                            </button>
                          </td>
                          {/* Print icon in the last column */}

                          <td>
                            <ReactToPrint
                              bodyClass="print-receipt"
                              content={() => ref && ref.current} // Make sure you define and pass a ref
                              trigger={() => (
                                <div>
                                  <img
                                    onClick={() => handleShowPrintModal(row)}
                                    src={Print}
                                    alt="Print"
                                    style={{ height: "3vh", width: "50%" }}
                                  />
                                </div>
                              )}
                            />
                          </td>
                        </tr>
                      ))}

                      <div style={{ display: "none" }}>
                        <Receipt
                          newOrderData={newOrderData}
                          ref={ref}
                          detailItem={detailItem}
                          // tamtItems={tamtItems}
                          // totalItem={totalItem}
                          priceDiscount={priceDiscount}
                          percentageDiscount={percentageDiscount}
                          totalAmount={totalAmount}
                        />
                      </div>

                      {/* Display blank rows to fill up to 91vh */}
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 8,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </MDBTableBody>

                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          {dataCar.length}
                        </th>
                        <th
                          colSpan={9}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        ></th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
                </div>
              </div>
            )}
            {dataOrderType1 === "6" && (
              // Delivery item table
              <div
                style={{
                  overflowY: "scroll",
                  fontSize: "10px",
                  overflow: "hidden",
                }}
              >
                <style>{customScrollbarStyle}</style>
                <br />
                <br />

                <div
                  style={{
                    // maxHeight: "78vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    fontSize: "11px",
                  }}
                >
                  <style>{customScrollbarStyle}</style>
                  <MDBTable
                    scrollY
                    maxHeight="81vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr>
                        <th style={tableCellStyle}>ID</th>
                        <th style={tableCellStyle}>Order Id</th>
                        <th style={tableCellStyle}>Table No</th>
                        <th style={tableCellStyle}>Waiter</th>
                        <th style={tableCellStyle}>Amount</th>
                        <th style={tableCellStyle}>Show Data</th>
                        <th style={tableCellStyle}>Add Item</th>
                        <th style={tableCellStyle}>Print</th>
                        {/* <th style={tableCellStyle}>Edit</th> */}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {dataDelivery.map((row, index) => (
                        <tr key={index}>
                          <td style={{ width: "1%" }}>{index + 1}</td>
                          <td style={{ width: "10%" }}>{row.id}</td>
                          <td style={{ width: "15%" }}>{row.tcstnam}</td>
                          <td style={{ textAlign: "left", width: "20%" }}>
                            {row.w_name}
                          </td>
                          <td>{row.totalAmt}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showitemsandadditem(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Show Data
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showcartitemlist(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Add Item
                            </button>
                          </td>
                          {/* Print icon in the last column */}

                          <td>
                            <ReactToPrint
                              bodyClass="print-receipt"
                              content={() => ref && ref.current} // Make sure you define and pass a ref
                              trigger={() => (
                                <div>
                                  <img
                                    onClick={() => handleShowPrintModal(row)}
                                    src={Print}
                                    alt="Print"
                                    style={{ height: "3vh", width: "60%" }}
                                  />
                                </div>
                              )}
                            />
                          </td>
                        </tr>
                      ))}

                      <div style={{ display: "none" }}>
                        <Receipt
                          newOrderData={newOrderData}
                          ref={ref}
                          detailItem={detailItem}
                          // tamtItems={tamtItems}
                          // totalItem={totalItem}
                          priceDiscount={priceDiscount}
                          percentageDiscount={percentageDiscount}
                          totalAmount={totalAmount}
                        />
                      </div>

                      {/* Display blank rows to fill up to 91vh */}
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: 8,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                    </MDBTableBody>

                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        >
                          {dataDelivery.length}
                        </th>
                        <th
                          colSpan={9}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        ></th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
                </div>
              </div>
            )}

            {/* ////////////////////////////// Five button in footer  */}
            <div
              className="row fixed-bottom"
              style={{ marginBottom: "4vh", marginLeft: "33%" }}
            >
              <div className="col-4">
                {dataOrderType1 >= "1" && dataOrderType1 <= "6" && (
                  <button
                    onClick={handleButtonClick1}
                    className="btn btn-primary"
                    style={buttonStyles}
                  >
                    {buttonTexts[parseInt(dataOrderType1) - 1]}
                  </button>
                )}
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDataOrderTypeeee1("6")}
                  style={buttonStyles}
                >
                  Delivery
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDataOrderTypeeee1("4")} // Pass a function reference
                  style={buttonStyles}
                >
                  Dining
                </button>
              </div>
              <div className="col-2">
                <button className="btn btn-primary" style={buttonStyles}>
                  Take Away
                </button>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setDataOrderTypeeee1("5")}
                  style={buttonStyles}
                >
                  Car
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Order_Dashboard;