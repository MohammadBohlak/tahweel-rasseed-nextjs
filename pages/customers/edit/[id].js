import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { url } from "../index";
import Layout from "../../component/Layout";
import {useLoader} from "@/hook/useLoader";

export default function EditId() {

  // function useLoader() {
  //   const [loader, setLoader] = useState("hidden");
  //   return { loader, setLoader };
  // };

  useEffect(() => {
    axios.get(`${url}/api/posts/${id}`).then((res) => {
      setName(res.data.name);
      setValue(res.data.value);
    });
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const {loader , setLoader} = useLoader()
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  function editCustomer(id) {
    setLoader("visible")
    axios
      .put(`${url}/api/posts/${id}`, {
        name: name,
        value: Number(value),
      })
      .then(() => {
        router.push("/customers");
      })
      .finally(() => {
        setLoader("hidden")
      });
  }
  return (
    <Layout visible={`${loader}`}>
      <form className="edit-modal" onSubmit={handleSubmit}>
        <div>
          <label>name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              editCustomer(id);
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
