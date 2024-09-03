import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { Vehicle } from '@/interfaces';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CarSelect from '@/assets/notfound.png';
type DateRange = [Date | null, Date | null];

const CalendarForm: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>()
  const [step, setStep] = useState<number>(1); // Current step
  const [selectedDates, setSelectedDates] = useState<DateRange>([null, null]); // Dates selected in step 1
  const [animationDirection, setAnimationDirection] = useState<'next' | 'previous'>('next'); // Animation direction
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // Animation state

  console.log(selectedVehicle);
  
  // Adjust the type to match `react-calendar`'s expected type
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    // Handle the case where dates is an array (for range selection)
    if (Array.isArray(value)) {
      setSelectedDates(value as DateRange);
    }
  };

  const handleNextStep = () => {
    if (!selectedDates[0] || !selectedDates[1]) {
      alert('Please select a range of dates before proceeding.');
      return;
    }
    setAnimationDirection('next'); // Set direction for next step
    triggerAnimation(() => setStep(step + 1));
  };

  const handlePreviousStep = () => {
    setAnimationDirection('previous'); // Set direction for previous step
    triggerAnimation(() => setStep(step - 1));
  };

  const triggerAnimation = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 500); // Duration should match the animation duration
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await useFetch('/vehicles', {});
      setVehicles(response);
    };
    fetchVehicles();
  }, []);
  console.log(vehicles);


  const renderStepContent = () => {
    let animationClasses = '';

    if (isAnimating) {
      animationClasses =
        animationDirection === 'next'
          ? 'transform -translate-x-full opacity-0'
          : 'transform translate-x-full opacity-0';
    } else {
      animationClasses = 'transform translate-x-0 opacity-100';
    }

    switch (step) {
      case 1:
        return (
          <div
            className={`flex gap-x-10 transition-all duration-500 ease-in-out ${animationClasses}`}
          >
            <div className='w-3/5 space-y-2 mt-10'>
              <h1 className='text-5xl font-semibold'>Schedule your request via our calendar.</h1>
              <p className='text-3xl font-bold'>Step 1:     </p>
              <ul className='ms-12'>
                <li>Determine range of days of the event and click (two if more than 1) the calendar's date you want.</li>
                <li>After select click <strong>next</strong></li>
              </ul>
            </div>
            <div>
              <p className="text-lg font-bold">Select dates</p>
              <Calendar
                next2Label={null}
                prev2Label={null}
                nextLabel={<ArrowRight className='inline-flex justify-center' size={15} />}
                prevLabel={<ArrowLeft className='inline-flex justify-center' size={15} />}
                className="w-full modern-calendar"
                selectRange={true} // Enable range selection
                onChange={handleDateChange} // Handle selected dates
                value={selectedDates} // Current selected dates
              />
              <Button className="my-2 float-right" onClick={handleNextStep}>
                Next <ArrowRight size={15} className='ms-2' />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            className={`transition-all duration-500 ease-in-out grid grid-cols-3 gap-10 relative ${animationClasses}`}
          >
            <div className='rounded-xl shadow-xl'>
              <p className='px-5 py-2 pb-1'>{vehicles.length} Vehicles</p>
              <ul className='max-h-[80vh] overflow-y-auto space-y-2'>
                {vehicles.map((vehicle) => (
                  <li key={vehicle._id} className='rounded border p-3 hover:opacity-70 relative group' onClick={() => setSelectedVehicle(vehicle)}>
                    <p className="absolute hidden group-hover:block bg-white rounded-full p-3 text-sm text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
                      See full details
                    </p>
                    <img src={`http://localhost:8000/images/vehicles/${vehicle.images[0]}`} className='rounded' alt={vehicle.model} />
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-span-2 rounded-xl shadow-xl p-5'>
              <h2 className='text-3xl font-semibold inline-flex items-center gap-x-3'><ArrowLeft /> Select a vehicle</h2>
              <p className='ms-10 text-xl'>See full details here</p>
              <div className='flex justify-center'>
                <img className='object-cover self-center mt-10' width={500} src={CarSelect} alt='Car Select' />
              </div>
              <div className='absolute bottom-0 right-0'>
                <Button className="mr-4" onClick={handlePreviousStep}>
                  Back
                </Button>
                <Button onClick={() => alert('Dates confirmed!')}>Confirm</Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      {renderStepContent()}
    </div>
  );
};

export default CalendarForm;
