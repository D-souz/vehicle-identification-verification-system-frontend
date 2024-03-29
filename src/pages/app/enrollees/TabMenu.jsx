import React, { Fragment, useRef } from "react";
import { Tab, Disclosure, Transition } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import cardImage2 from "@/assets/images/all-img/card-2.png";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getQrcodeDownloads, getQrcodeScans } from "../agents/agentsStore";


// tab buttons headings
const buttons = [
    {
      title: "Overview",
    //   icon: "heroicons-outline:home",
    },
    // {
    //   title: "Vehicle details",
    // //   icon: "heroicons-outline:user",
    // },
    {
      title: "History",
    //   icon: "heroicons-outline:chat-alt-2",
    },
  ];

function TabMenu() {
    const { enrollee, qrcode } = useSelector((state) => state.enrollees);
    const { enrolleeStats } = useSelector((state) => state.stats);
    const { agent } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = agent._id;
    // console.log(id)

// scanning qrcode
const handleScan = () => {
    navigate('/scan');

    // updating agent's qrcode Scans
    dispatch(getQrcodeScans({ id }));
}

// // downloading qrcode
const handleQrCodeDownload = () =>{
    const link = document.createElement('a');
    link.href = qrcode;
    link.download = 'qrcode.png';
    link.click();

    toast.success("Qr code downloaded successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    // updating agent's qrcode downloads
      dispatch(getQrcodeDownloads({ id }));
}

  return (
    <div>
     <Tab.Group>
        <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
        {buttons.map((item, i) => (
            <Tab as={Fragment} key={i}>
            {({ selected }) => (
                <button
                className={` text-sm font-medium mb-7 capitalize bg-white
        dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
            transition duration-150 before:transition-all before:duration-150 relative 
            before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 
            before:-translate-x-1/2 
            
            ${
            selected
                ? "text-primary-500 before:w-full"
                : "text-slate-500 before:w-0 dark:text-slate-300"
            }
            `}
                >
                {item.title}
                </button>
            )}
            </Tab>
        ))}
        </Tab.List>
        <Tab.Panels>
        <Tab.Panel>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                <div className="fw-bold pb-2">Personal Details</div>
                    <div className="row p-2">
                        <div className="col-6">
                            <Card bodyClass="p-2">
                            <div className="h-[140px] w-full">
                                <img
                                    src={'http://localhost:3000/uploads/'+enrollee.image}
                                    alt="enrollee profile image"
                                    className="block w-full h-full object-cover rounded-t-md"
                                />
                            </div>
                            <div className="p-4">
                                <div className="text-sm">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td className="p-2">{enrollee.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td className="p-2">{enrollee.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact</td>
                                        <td className="p-2">{enrollee.telephone}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td className="p-2">{enrollee.address}</td>
                                    </tr>
                                    <tr>
                                        <td>NIN</td>
                                        <td className="p-2">{enrollee.nin}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td className="p-2">{enrollee.gender}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </Card>
                     </div>
                     <div className="col-6">
                        <div>
                            <Card>
                                {qrcode ? 
                                <div>
                                    <div className="pl-14">
                                        <img src={qrcode} alt="qr code" id="qrcode"/>
                                    </div>
                                    <div className="pl-6">
                                        <Button 
                                            text="Download qr code"
                                            className="btn-outline-secondary p-2 mr-4 text-muted"
                                            onClick={handleQrCodeDownload}
                                        />
                                        <Button 
                                            text="Scan"
                                            className="btn-outline-secondary p-2 text-muted w-40"
                                            onClick={handleScan}
                                        />
                                    </div>
                                </div>
                                 :
                                 <h3>No Qr code generated! </h3>
                                }
                            </Card>
                        </div>
                        
                    </div>
                    </div>
                    <div>
                        <div className="fw-bold pt-4">Vehicle Details</div>
                        <div className="text-sm">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>VIN</td>
                                        <td className="p-2">{enrollee.vin}</td>
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        <td className="p-2">{enrollee.model}</td>
                                    </tr>
                                    <tr>
                                        <td>Lisence Number</td>
                                        <td className="p-2">{enrollee.numberPlate}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of registration</td>
                                        <td className="p-2">{new Date(enrollee.createdAt).toLocaleString("en-Us")}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>NIN</td>
                                        <td className="p-2">CMTYI799LIT98</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                
            </div>
        </Tab.Panel>
        <Tab.Panel>
        <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
        <div className="fw-bold pb-2">Access History</div>
            <Card>
                <div className="text-sm">
                        <table>
                            <tbody>
                            <tr>
                                <td className="text-success-500 fw-bold">Total times granted access in</td>
                                <td className="p-2 fw-bold">{enrolleeStats.totalGrantedIn}</td>
                            </tr>
                            <tr>
                                <td className="text-danger">Total times granted access out</td>
                                <td className="p-2 fw-bold">{enrolleeStats.totalGrantedOut}</td>
                            </tr>
                            <tr>
                                <td className="text-info-600">Total times denied access</td>
                                <td className="p-2 fw-bold">{enrolleeStats.totalDenied}</td>
                            </tr>
                            <tr>
                                <td className="text-primary-800">Date of registration</td>
                                <td className="p-2 fw-bold">{new Date(enrollee.createdAt).toLocaleString("en-Us")}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </Card>
            </div>

        </Tab.Panel>
        </Tab.Panels>
     </Tab.Group>
    </div>
  )
}

export default TabMenu;