import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { Button, Input, AutoComplete } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import highlightJSX from "@/utils/highlightJSX";

const Header = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [dropdownSearchState, setDropdownSearchState] = useState(false);
  const handleSearch = async (value) => {
    setValueSearch(value);
    const { data: users } = await fetch(
      "/api/users?searchTerm=" + value.toLowerCase()
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
                  <strong>firstName</strong>:{highlightJSX(reg, v.firstName)} |{" "}
                  <strong>lastName</strong>: {highlightJSX(reg, v.lastName)} |{" "}
                  <strong>nationalityIDNum</strong>:{" "}
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
    <div className="header">
      <AutoComplete
        dropdownMatchSelectWidth={252}
        options={options}
        open={dropdownSearchState}
        className="search"
        style={{ minWidth: "700px" }}
        onSelect={onSelect}
        value={valueSearch}
        onSearch={handleSearch}
      >
        <Input
          placeholder="ស្វែងរក"
          suffix={
            <SearchOutlined
              style={{ fontSize: "1.35rem" }}
              onClick={() => {
                setDropdownSearchState(false);
                router.push("/employee?s=" + valueSearch);
              }}
            />
          }
        />
      </AutoComplete>
      <div className="headerInfo">
        <div>
          <p>
            {/* ក្រសួង-ស្ថាប័ន */}
            <span style={{ color: "#6a0e00", fontWeight: "bold" }}>
            khambodiaHR
            </span>
          </p>
        </div>
        <div>
          <p>
            ឈ្មោះអ្នកចូលប្រើ{" "}
            <span style={{ color: "#6a0e00", fontWeight: "bold" }}>
              {session && session.user?.firstName}
            </span>
          </p>
        </div>
        {session ? (
          <Button
            onClick={() => {
              signOut({ redirect: false });
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;