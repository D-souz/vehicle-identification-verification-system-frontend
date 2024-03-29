import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import BasicArea from "../../chart/appex-chart/BasicArea";
import { toast } from "react-toastify";
import Modal from "../../../components/ui/Modal";
import EditAgent from "./editAgent";

// import images
// import ProfileImage from "@/assets/images/users/user-1.jpg";
import responsiveImage4 from "@/assets/images/all-img/thumb-4.png";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAgent, reset } from "./agentsStore";


const AgentsDetailsPage = () => {
const { id } = useParams();
const dispatch = useDispatch();
const { isActive } = useSelector((state) => state.auth);
const {isLoading, isSuccess, isError } = useSelector((state) => state.agents);
const agent = useSelector((state) => state.agents.agent);
// console.log(isActive);

// fetch the agent
useEffect(() => {
  if (isError) {
    console.log(message);
  }
  dispatch(getSingleAgent(id))


  // return () => {
  //   dispatch(reset())
  // }
}, [id, dispatch])

  return (
    <div>
      <div className="space-y-5 AgentsDetailsPage-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
          <div className="AgentsDetailsPage-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src={responsiveImage4}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                  <Modal
                    title="Edit Agent"
                    label={<Icon icon="heroicons:pencil-square" />}
                    name="Edit"
                    labelClass="absolute right-2  bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                    uncontrol
                  >
                    <EditAgent />
                  </Modal>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {agent.name}
                </div>
                {
                  isActive 
                  ?
                  <div className="text-sm font-bold text-success-500">
                    Active
                  </div>
                  :
                  <div className="text-sm font-bold text-danger-500">
                    Inactive
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="AgentsDetailsPage-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {agent.scansCount}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                  <span>Scans</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {agent.role}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Role
              </div>
            </div>

            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {agent.generationsCount}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
              Qr code Generated
              </div>
            </div>
            <div className="flex-1">
              <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                {agent.downloadsCount}
              </div>
              <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                Qr code Downloads
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info">
              <ul className="list space-y-8">
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:user" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      AGENT ID
                    </div>
                    <a
                      href="#"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {agent._id}
                    </a>
                  </div>
                </li>
                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:envelope" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      EMAIL
                    </div>
                    <a
                      href="mailto:someone@example.com"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                      {agent.email}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="heroicons:phone-arrow-up-right" />
                  </div>
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      PHONE
                    </div>
                    <a
                      href="tel:0189749676767"
                      className="text-base text-slate-600 dark:text-slate-50"
                    >
                     {agent.telephone}
                    </a>
                  </div>
                </li>

                <li className="flex space-x-3 rtl:space-x-reverse">
                  {/* <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                    <Icon icon="mdi:location" />
                  </div> */}
                  <div className="flex-1">
                    <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                      REGISTERED ON
                    </div>
                    <div className="text-base text-slate-600 dark:text-slate-50 text-success">
                      { new Date(agent.createdAt).toLocaleString("en-Us")}
                    </div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Card title="Activity Overview">
              <BasicArea height={190} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsDetailsPage;
