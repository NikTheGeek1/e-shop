import axios from "axios";
import { CountryType } from "../../types/country";

export default async function getServerSideProps(): Promise<{
  props: { country: CountryType };
}> {
  let data: any = {};
  let currency;
  // if (process.env.NODE_ENV === "production") {
  if (false) {
    const res = await axios.get(
      "https://api.ipregistry.co/?key=" + process.env.IP_REGISTRY_API_KEY,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
    );
    data = res.data.location.country;
    currency = res.data.currency.code;
  } else {
    data["name"] = "Greece";
    data["flag"] = {};
    data["flag"]["emojitwo"] =
      "https://cdn.ipregistry.co/flags/emojitwo/gr.svg";
    currency = "EUR";
  }

  return {
    props: {
      country: { name: data.name, flag: data.flag.emojitwo, currency },
    },
  };
}
