import InfoBox from "@/components/InfoBox"

const InfoBoxes = () => {
  return (
    <section>
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <InfoBox
            heading='About 5000+ Cars'
            linkText='Browse cars'
            linkPath='/cars'
            linkBackground='hover:bg-backgroundGray transition-all bg-dark'
            linkColor='text-light'
          >
            Contact the owners by sending them message to let them know that you're interested.
          </InfoBox>
          <InfoBox
            heading='For Car Owners'
            linkText='Add post'
            linkPath='/cars/add'
            linkBackground='bg-orangeGradient hover:opacity-95'
            linkColor='text-dark'
            textColor="text-[#FF7B00]"
          >
            List your cars to reach potential clients, sell and rent your cars.
          </InfoBox>
          <InfoBox
            heading='Enterprise & Sales'
            linkText='Contact us'
            linkPath='/'
            linkBackground='bg-light hover:opacity-95'
            linkColor='text-dark'
          >
            Contact us, we are looking forward to hearing from you!
          </InfoBox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes