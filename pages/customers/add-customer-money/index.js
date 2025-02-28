import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { url } from "../index";
import Layout from "../../component/Layout";
import {useLoader} from "@/hook/useLoader";

export default function EditId() {

  // function useLoader() {
  //   const [loader, setLoader] = useState("hidden");
  //   return { loader, setLoader };
  // };

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  const date = `${day}/${month}/${year}`;

  const router = useRouter();
  const {loader , setLoader} = useLoader()
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [cost, setCost] = useState(0);
  const [valueApi, setValueApi] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  function addCustomer(id) {
    setLoader("visible")
    axios
      .post(`${url}/api/posts`, {
        name: name,
        value: Number(valueApi),
        date: date,
      })
      .then(() => {
        router.push("/customers");
      }).finally(()=>{
        setLoader("hidden")
      });
  }
  return (
    <Layout visible={`${loader}`}>
      <form className="edit-modal" onSubmit={handleSubmit}>
        <h2>أدخل المبلغ المدفوع </h2>
        <div>
          <label className="label-input">الاسم</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="label-input">المبلغ</label>
          <input
            type="text"
            inputmode="numeric"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setCost((Number(e.target.value) / 1250) * 1043);
              setValueApi(Number(e.target.value) / 1.25);
            }}
          />
        </div>
        {cost > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "50px",
            }}
          >
            <p style={{width:"100%" , textAlign:"center"}}> الرصيد الذي سيتم تحويله للزبون: {valueApi}</p>
            <p style={{width:"100%" , textAlign:"center"}}>رقم العملية : {cost.toFixed(0)}</p>
          </div>
        ) : undefined}
        <div className="buttons">
          <button
            onClick={() => {
              addCustomer();
            }}
            className="ok"
          >
            تم
          </button>
          <Link href="/customers">
            <button className="back">تراجع</button>
          </Link>
        </div>
      </form>
    </Layout>
  );
}
