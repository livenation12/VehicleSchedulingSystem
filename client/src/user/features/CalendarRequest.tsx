import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { Vehicle } from '@/interfaces';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CarSelect from '@/assets/notfound.png';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
type DateRange = [Date | null, Date | null];

const CalendarForm: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>()
  const [step, setStep] = useState<number>(1); // Current step
  const [selectedDates, setSelectedDates] = useState<DateRange>([null, null]); // Dates selected in step 1
  const [animationDirection, setAnimationDirection] = useState<'next' | 'previous'>('next'); // Animation direction
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // Animation state
  const { toast } = useToast();
  // Adjust the type to match `react-calendar`'s expected type
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    // Handle the case where dates is an array (for range selection)
    if (Array.isArray(value)) {
      setSelectedDates(value as DateRange);
    }
  };

  const handleNextStep = () => {
    if (!selectedDates[0] || !selectedDates[1]) {
      toast({
        title: 'Ooops!',
        description: 'Please select a range of dates before proceeding.',
      })
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
          <>
            <div
              className={`transition-all duration-500 ease-in-out relative ${animationClasses}`}
            >
              <div className='flex justify-between'>
                <div>
                  <h2 className='text-4xl font-bold'>Step 2:</h2>
                  <p className='ms-5 mt-2'>Choose the appropriate available vehicle for the campus on the left</p>
                  <p className='ms-5'>See the vehicle details on the right, then <strong>submit</strong></p>
                  <p className='ms-5'>Violaaa, your request is now submitted</p>
                </div>
                <div>
                  <div className='bg-yellow-500 p-3 text-sm text-gray-100 rounded-lg'>
                    <h4 className='font-semibold'>Your event date</h4>
                    <p>{selectedDates[0]?.toLocaleDateString() || 'No date selected'} to {selectedDates[1]?.toLocaleDateString() || 'No date selected'}</p>
                  </div>
                </div>
              </div>
              <div className='grid lg:grid-cols-3 gap-4'>
                <div className=''>
                  <p className='px-5 py-2 pb-1'>{vehicles.length} Vehicles</p>
                  <ul className='space-y-4 flex lg:flex-col'>
                    {vehicles.map((vehicle) => (
                      <li key={vehicle._id} className='rounded-lg border shadow-lg p-3 hover:opacity-70 relative group' onClick={() => setSelectedVehicle(vehicle)}>
                        <p className="absolute hidden cursor-pointer group-hover:block bg-white rounded-full py-1 px-2 text-xs text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
                          Click to see full details
                        </p>
                        <img src={`${import.meta.env.VITE_UPLOAD_URL}/vehicles/${vehicle.images[0]}`} className='rounded object-cover' alt={vehicle.model} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='col-span-2'>
                  <div className='p-5 rounded-xl border min-h-[500px] border-gray-300 sticky top-20 shadow-xl'>
                    {selectedVehicle ? (
                      <>
                        <div className='max-w-full flex justify-center overflow-x-auto gap-1'>
                          {selectedVehicle.images.map((image, index) => (
                            <img key={index} src={`${import.meta.env.VITE_UPLOAD_URL}/vehicles/${image}`} className='object-cover h-52 rounded' alt={selectedVehicle.model} />
                          ))}
                        </div>
                        <div className='m-14'>
                          <p className='text-3xl font-semibold'>{selectedVehicle.model}  <sup className='text-base'>({selectedVehicle.year})</sup></p>
                          <p className='ms-2'>{selectedVehicle.color}</p>
                          <p className='ms-2'>{selectedVehicle.licensePlate}</p>

                        </div>
                        <div className='absolute bottom-3 right-3'>
                          <Button variant={'ghost'} className="mr-2" onClick={handlePreviousStep}>Back to calendar</Button>
                          <Button onClick={() => alert('Dates confirmed!')}>Confirm</Button>
                        </div>
                      </>
                    )
                      :
                      <>
                        <Button variant={'ghost'} className="float-right underline" onClick={handlePreviousStep}>Back to calendar</Button>
                        <h2 className='text-3xl font-semibold inline-flex items-center gap-x-3'><ArrowLeft /> Select a vehicle</h2>
                        <p className='ms-10 text-xl'>See full details here</p>
                        <div className='flex justify-center'>
                          <img className='object-cover self-center mt-10' width={500} src={CarSelect} alt='Car Select' />
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
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
