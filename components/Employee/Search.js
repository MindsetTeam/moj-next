import { SearchOutlined } from "@ant-design/icons";
import { Input, AutoComplete } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import highlightJSX from "@/utils/highlightJSX";

const Search = () => {
   const router = useRouter();
   const [valueSearch, setValueSearch] = useState("");
   const [options, setOptions] = useState([]);
   const [dropdownSearchState, setDropdownSearchState] = useState(false);
   const handleSearch = async (value) => {
      setValueSearch(value);
      const { data: users } = await fetch(
         "/api/users?select=firstName,lastName,lastNameLatin,firstNameLatin,nationalityIDNum&searchTerm=" +
            value.toLowerCase()
      ).then((res) => res.json());
      setDropdownSearchState(true);
      setOptions(
         value
            ? users.map((v) => {
                 const reg = new RegExp(value, "gi");
                 return {
                    value: v.id,
                    label: (
                       <span>
                          {/* <strong>firstName</strong>: */}
                          {highlightJSX(reg, v.firstName)}{" "}
                          {/* <strong>lastName</strong>:{" "} */}
                          {highlightJSX(reg, v.lastName)} |{" "}
                          {highlightJSX(reg, v.firstNameLatin)}{" "}
                          {highlightJSX(reg, v.lastNameLatin)} |{" "}
                          <strong>អត្តសញ្ញាណប័ណ្ណ</strong>:{" "}
                          {highlightJSX(reg, v.nationalityIDNum)}
                       </span>
                    ),
                 };
              })
            : []
      );
   };

   const onSelect = (value) => {
      setValueSearch(valueSearch);
      setDropdownSearchState(false);
      router.push("/employee/" + value);
   };

   return (
      <AutoComplete
         dropdownMatchSelectWidth={252}
         options={options}
         open={dropdownSearchState}
         className="search"
         // style={{ width: "70%", margin: "0 auto", display: "block" }}
         style={{ width: "100%" }}
         onSelect={onSelect}
         value={valueSearch}
         onSearch={handleSearch}
      >
         <Input
            placeholder="ស្វែងរកតាមឈ្មោះ អត្តលេខ..."
            style={{ padding: 10 }}
            suffix={
               <SearchOutlined
                  style={{ fontSize: "1.35rem" }}
                  onClick={() => {
                     setDropdownSearchState(false);
                     // router.push("/employee?s=" + valueSearch);
                     router.push({
                        pathname: "/employee",
                        query: { ...router.query, s: valueSearch },
                     });
                  }}
               />
            }
         />
      </AutoComplete>
   );
};

export default Search;
