

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead ,MDBTableFoot} from 'mdbreact';
import Header from '../../../MainComponent/Header/Header';
import Footer from '../../../MainComponent/Footer/Footer';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import Edit from '../../../../image/edit.png';
import '../Get_MOP/Get_MOP.css';
import { useTheme } from '../../../../ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMOP } from '../../../../Redux/Action';

const Get_MOP = () => {
  const dispatch = useDispatch();
  const MOPData = useSelector((state) => state.mop);
  useEffect(() => {
    dispatch(fetchMOP());
  }, [dispatch]);

  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks ,fontFamily} = useTheme();

  const handleMenuItemClick = () => {
    navigate('/Add_MOP');
  };

  const [filterValue, setFilterValue] = useState('');





  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (item) => {
    if (selectedRow === item.id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_MOP/${item.id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(item.id);
    }
  };

const filteredData = MOPData?.data
? MOPData.data.filter((row) =>
    row.paydsc.toLowerCase().includes(filterValue.toLowerCase())
  )
: [];
  return (
    <>
      <Header />

      <PathHead pageName="File > Method of Payment Maintenance" screen='Get_Item' pageLink="/MainPage"/>
      <div className="col-12" style={{fontFamily:fontFamily}}>
        <br />
        <br />
        <div>
        <div className="col-12 MOP-container" style={{padding:'10px'  ,border: "1px solid black" ,backgroundColor:'white'}}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button
      className="btn btn-primary"
      onClick={handleMenuItemClick}
      style={{
        backgroundColor: primaryColor,
        height: '4%',
        fontSize: '11px',
        color: secondaryColor,
        width: '15%',
        marginRight: '2%',
      }}
    >
      ADD
    </button>
    
    <div style={{ marginLeft: 'auto' }}>
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </div>
  </div>
  <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
            <MDBTable scrollY maxHeight="65vh" striped bordered small responsive>
              <MDBTableHead>
                <tr>
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    ID
                  </th>
                 
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    Description
                  </th>
                  
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    Status
                  </th>
                  
                
                </tr>
              </MDBTableHead>

              <MDBTableBody>
              
          {filteredData.map((item) => (
                    <tr key={item + 1} onClick={() => handleRowClick(item)} style={{ height: '27px' }}>
                    <td>{item.id || ''}</td>
                    <td style={{ textAlign: 'left' }}>{item.paydsc || ''}</td>
                    <td>{item.paysts || ''}</td>
                  </tr>
                  ))}
                {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 100) / 33
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({
                        length: 3,
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
                  >{filteredData.length}</th>
                  <th
                    colSpan={6}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,

                      textAlign: "left",
                    }}
                  >
                    
                  </th>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
</div>

         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Get_MOP;

