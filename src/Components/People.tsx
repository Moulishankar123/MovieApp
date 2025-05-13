import { useQuery } from "@tanstack/react-query";

type Person = {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
};

const fetchPeople = async (): Promise<Person[]> => {
  const url = `${import.meta.env.VITE_TMDB_BASE_URL}/person/popular`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  const data = await response.json();
  return data.results;
};

const People = () => {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["popular-people"],
    queryFn: fetchPeople,
  });

  if (isLoading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* <nav className="bg-black backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">My Movie App</h1>
        <ul className="flex gap-6 text-sm md:text-base text-white">
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="/movie">Movies</Link>
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <Link to="/people">People</Link>
          </li>
        </ul>
      </nav> */}

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Popular People</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((person) => (
            <div key={person.id} className="bg-gray-100 p-2 rounded hover:shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-full h-72 object-cover rounded"
              />
              <h3 className="mt-2 text-sm font-semibold text-center">{person.name}</h3>
              <p className="text-xs text-gray-500 text-center">{person.known_for_department}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
