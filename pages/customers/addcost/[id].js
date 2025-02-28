import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { url } from "../index";
import Layout from "../../component/Layout";
import {useLoader} from "@/hook/useLoader";

export default function Add() {

  // function useLoader() {
  //   const [loader, setLoader] = useState("hidden");
  //   return { loader, setLoader };
  // };

  const [customer, setCustomer] = useState({});
  const [price, setPrice] = useState('');
  const router = useRouter();
  const {loader , setLoader} = useLoader()
  const { id } = router.query;
  useEffect(() => {
    setLoader("visible")
    axios.get(`${url}/api/posts/${id}`).then((res) => {
      // setValue(0)
      setCustomer(res.data);
    }).finally(()=>{
      setLoader("hidden")
    });
  }, []);
  function addValue() {
    // let newPrice =  customer.price + Number(price)

    let newValue = Number(price) / 1.25;
    setLoader("visible")
    axios
      .put(`${url}/api/posts/${id}`, {
        name: customer.name,
        value: customer.value + newValue,
      })
      .then((res) => {
        router.push("/customers");
      }).finally(()=>{
        setLoader("hidden")
      });
  }
  return (
    <Layout visible={`${loader}`}>
      <form
        className="edit-modal"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 style={{ marginBottom: "5px" }}>
            أدخل القيمة المراد إضافتها
          </h2>
          <input
            type="text"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              addValue();
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
