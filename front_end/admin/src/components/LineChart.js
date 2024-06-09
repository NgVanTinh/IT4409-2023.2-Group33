import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const LineCharts = (category) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = async () => {
  //   try {
  //     const result = await axios.get(`https://dummyjson.com/carts`);
  //     setCategories(result.data);
  //   } catch (error) {
  //     console.error('Error loading categories:', error);
  //   }
  // };

  const data = [
    { label: ' A', value: 4 },
    { label: ' B', value: 3 },
    { label: ' C', value: 5 },
    { label: ' D', value: 1 },
    { label: ' E', value: 6 },
    { label: ' F', value: 3 },
    { label: ' G', value: 2 },
    { label: ' H', value: 5 },
    { label: ' I', value: 6 },
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.map(item => item.label) }]}
      series={[{ data: data.map(item => item.value) }]}
      width={600}
      height={200}
    />
  );
}


export default LineCharts;