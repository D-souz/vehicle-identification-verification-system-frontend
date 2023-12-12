import React, { Fragment } from "react";
import { Tab, Disclosure, Transition } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import cardImage2 from "@/assets/images/all-img/card-2.png";
import { useSelector } from "react-redux";

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
    // {
    //   title: "Settings",
    //   icon: "heroicons-outline:cog",
    // },
  ];

function TabMenu() {
    const { enrollee } = useSelector((state) => state.enrollees);
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
                        <div className="col-5">
                            <Card bodyClass="p-2">
                            <div className="h-[140px] w-full">
                                <img
                                src={cardImage2}
                                alt=""
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
                                        <td className="p-2">j{enrollee.email}</td>
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
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            </Card>
                     </div>
                     <div className="col-4"></div>
                     <div className="col-3">
                        <div>
                            <Card>
                                <h5>The qrcode goes here</h5>
                            </Card>
                            <div>
                                <h5>Actions</h5>
                                <p>print</p>
                                <p>scan</p>
                            </div>
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
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
            Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
            tempor enim.
            </div>
        </Tab.Panel>
        <Tab.Panel>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
            Sunt qui
            </div>
        </Tab.Panel>
        <Tab.Panel>
            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
            Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
            tempor enim. Elit aute irure tempor cupidatat incididunt sint
            deserunt ut voluptate aute id deserunt nisi.
            </div>
        </Tab.Panel>
        </Tab.Panels>
     </Tab.Group>
    </div>
  )
}

export default TabMenu