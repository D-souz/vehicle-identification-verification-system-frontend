import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import Select from "../../../components/ui/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateAgent } from "./agentsStore";

const options = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  }
];

const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    role: yup.string().required("A role is Required"),
    telephone: yup.string().required("Telephone is Required"),
    gender: yup.string().required("Select a gender"),
  })
  .required();

const EditAgent = () => {
  const dispatch = useDispatch();
  const { agentAuth } = useSelector((state) => state.auth);
  const { agent, isLoading, isError, isSuccess, message } = useSelector((state) => state.agents);
  const id = agent._id;

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

 useEffect(() => {
    setValue("name", agent.name);
    setValue("email", agent.email);
    setValue("telephone", agent.telephone);
    setValue("role", agent.role);
    // setValue("age", enrollee.age);
    setValue("gender", agent.gender);

 }, [setValue]);

  const onSubmit = (data) => {

    if (agentAuth != "admin") {
      toast.error("Not authorized to perform action", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

      dispatch(updateAgent({ id, data} ));
      // console.log(data)
  
      if (isError) {
        toast.error(message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (isSuccess || agent) {
        toast.success("Agent updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
      }
    }
  };

  if (isLoading) {
    toast.info("Updating agent...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="name"
        label="name"
        type="text"
        register={register}
        error={errors.name}
        className="h-[48px]"
      />
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
       <Textinput
        name="role"
        label="role"
        type="text"
        placeholder=" Enter your role"
        register={register}
        error={errors.role}
        className="h-[48px]"
      />
       <Textinput
        name="telephone"
        label="telephone"
        type="tel"
        register={register}
        error={errors.telephone}
        className="h-[48px]"
      />
      <Select
        name="gender"
        label="gender"
        options={options}
        register={register}
        error={errors.gender}
        className="h-[48px]"
      />
      <button type="submit" className="btn btn-dark block w-full text-center">
        Update
      </button>
    </form>
  );
};

export default EditAgent;
