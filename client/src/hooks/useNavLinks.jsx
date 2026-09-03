import { useGetServicesQuery } from "../redux/api/serviceApi";

const useNavLinks = () => {
  const { data, isLoading, isError } = useGetServicesQuery();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "about" },

    {
      name: "Services",
      path: "services",

      ...(!isLoading && !isError && {
        subLinks: data?.services?.map((service) => ({
          name: service.title,
          path: `${service.id}`,
        })),
      }),
    },

    { name: "Portfolio", path: "portfolio" },
    { name: "Contact", path: "contact" },
  ];

  return navLinks;
};

export default useNavLinks;