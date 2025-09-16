import {
  CalendarIcon,
  ChevronDownIcon,
  FileTextIcon,
  InfoIcon,
  User,
  Menu,
  X,
  Circle,
  Info

} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/Tabs";
import { SimpleLineChart } from "../components/Charts";

export const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const summaryCards = [
    {
      title: "Conversions ROAS:",
      value: "0.00%",
      change: "0%",
      changeColor: "text-[#8a8a8a]",
    },
    {
      title: "Conversions ROAS:",
      value: "$6,109.89",
      change: "+27.42%",
      changeColor: "text-[#4bce00]",
    },
    {
      title: "Conversions ROAS:",
      value: "0.00%",
      change: "0%",
      changeColor: "text-[#8a8a8a]",
    },
    {
      title: "Conversions ROAS:",
      value: "$2,101",
      change: "0%",
      changeColor: "text-[#ff7200]",
    },
    {
      title: "Conversions ROAS:",
      value: "$2.91",
      change: "0%",
      changeColor: "text-[#ff7200]",
    },
    {
      title: "Conversions ROAS:",
      value: "0",
      change: "0%",
      changeColor: "text-[#8a8a8a]",
    },
    {
      title: "Conversions ROAS:",
      value: "$0.00",
      change: "0%",
      changeColor: "text-[#8a8a8a]",
    },
  ];

  // Sample data for area chart
  const areaChartData = [
    { name: "Jul 1", value: 4000 },
    { name: "Jul 2", value: 3000 },
    { name: "Jul 3", value: 2000 },
    { name: "Jul 4", value: 2780 },
    { name: "Jul 5", value: 1890 },
    { name: "Jul 6", value: 2390 },
    { name: "Jul 7", value: 3490 },
  ];

  // Sample data for pie chart
  const pieChartData = [
    { name: "Organic Search", value: 400 },
    { name: "Direct", value: 300 },
    { name: "Referral", value: 300 },
    { name: "Social Media", value: 200 },
  ];

  // Sample data for bar chart
  const barChartData = [
    { name: "Mon", value: 4000 },
    { name: "Tue", value: 3000 },
    { name: "Wed", value: 2000 },
    { name: "Thu", value: 2780 },
    { name: "Fri", value: 1890 },
    { name: "Sat", value: 2390 },
    { name: "Sun", value: 3490 },
  ];

  // Sample data for line chart
  const lineChartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ];

  // Restored Storefronts data
  const storefrontsData = [
    { name: "Google Play", spend: 8500, percentage: 46.4 },
    { name: "App Store", spend: 6200, percentage: 33.8 },
    { name: "Amazon Appstore", spend: 2100, percentage: 11.5 },
    { name: "Samsung Galaxy Store", spend: 1529.67, percentage: 8.3 },
  ];

  // Spend trend data aligned with summary card values
  const spendTrendData = [
    { date: "Jul 1", spend: 2101 },
    { date: "Jul 2", spend: 3500 },
    { date: "Jul 3", spend: 6109 },
    { date: "Jul 4", spend: 4200 },
    { date: "Jul 5", spend: 5800 },
    { date: "Jul 6", spend: 3900 },
    { date: "Jul 7", spend: 6109 },
  ];

  const topListCampaigns = [
    {
      name: "Discovery (LOC)",
      location: "India",
      spend: "$6,109.89",
      installs: "$44",
      conversion: "0.00%",
      spendChange: "+27.42%",
      installsChange: "+27.42%",
      conversionChange: "0%",
    },
    {
      name: "Competitor (LOC)",
      location: "India",
      spend: "$6,109.89",
      installs: "$121",
      conversion: "0.00%",
      spendChange: "+27.42%",
      installsChange: "+27.42%",
      conversionChange: "0%",
    },
    {
      name: "Today tab (LOC)",
      location: "India",
      spend: "$6,109.89",
      installs: "$44",
      conversion: "0.00%",
      spendChange: "+27.42%",
      installsChange: "+27.42%",
      conversionChange: "0%",
    },
  ];

  const biggestChangesCampaigns = [
    {
      name: "Discovery (LOC)",
      location: "India",
      spend: "$6,109.89",
      change: "+27.42%",
    },
    {
      name: "Competitor (LOC)",
      location: "India",
      spend: "$6,109.89",
      change: "+27.42%",
    },
    {
      name: "Today tab (LOC)",
      location: "India",
      spend: "$6,109.89",
      change: "+27.42%",
    },
    {
      name: "Branding (LOC)",
      location: "India",
      spend: "$6,109.89",
      change: "+27.42%",
    },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-[#ff5900] p-1 text-white rounded-md shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={22} color="white" /> : <Menu size={22} color="white" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#ff5900] z-40 transition-transform duration-300 ease-in-out ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isMobile ? (sidebarOpen ? 'translate-x-0 w-20' : '-translate-x-full w-20') : 'translate-x-0 w-14'}`}
      >
        <div className="flex flex-col items-center mt-2 pt-5 space-y-4 h-full">
          <div className="relative mt-4 w-10 h-10 flex justify-center items-center">
            <Circle size={40} color="white" />
            <User
              size={20}
              color="white"
              className="absolute"
            />
          </div>


          <div className="hidden md:block w-full px-2 mt-6 flex-1">
            <div className="w-full h-2 bg-white/30 rounded" />
            <div className="mt-6 flex justify-center">
              <img
                src="/frame-2147224181.svg"
                alt="Sidebar"
                className="w-60 h-auto object-contain mx-auto"
              />
            </div>
          </div>

          <div className="mt-auto mb-6 px-2">
            <img
              className="w-6 h-28 object-contain"
              alt="Frame"
              src="/frame-2147224182.svg"
            />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`transition-all duration-300 ease-in-out overflow-y-auto min-h-screen ${isMobile ? `${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16` : 'ml-14'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <header className="flex-1 min-w-0">
              <h1 className="font-semibold text-black text-2xl md:text-3xl tracking-[0] leading-[normal] mb-1 truncate">
                Overview dashboard
              </h1>
              <p className="font-normal text-[#7b7b7b] text-sm md:text-base tracking-[0] leading-[normal] truncate">
                A consolidated view of your app efficiency by storefronts and key metrics.
              </p>
            </header>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-[140px] md:w-[220px] h-[36px] bg-white rounded-xl border border-solid border-[#bdbdbd] flex items-center px-2 md:px-3">
                <FileTextIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                <span className="ml-2 md:ml-4 font-normal text-[#7b7b7b] text-xs md:text-sm flex-1 truncate">
                  Pdf Name
                </span>
                <ChevronDownIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 md:w-7 md:h-7 text-gray-600" />
                <div className="flex flex-col text-right">
                  <span className="font-normal text-[#7b7b7b] text-xs md:text-sm">
                    Last 7 Days
                  </span>
                  <span className="font-normal text-black text-xs md:text-sm">
                    Jul 5 - Jul 11, 2025
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fefefe] shadow-[inset_0px_4px_29.1px_#0000000a] p-3 md:p-4 rounded">
            <section className="mb-4">
              <h2 className="font-medium text-black text-base md:text-lg tracking-[0] leading-[normal] mb-2">
                Total Summary
              </h2>

              {/* Two-row summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                {summaryCards.slice(0, 4).map((card, index) => (
                  <Card
                    key={index}
                    className="w-full h-[70px] md:h-[80px] bg-white rounded-[6.8px] shadow-[0px_4px_13.3px_#00000008] border-0 transition-all duration-300 hover:shadow-lg"
                  >
                    <CardContent className="p-2 md:p-3 h-full flex flex-col justify-between">
                      <div className="font-normal text-[#2a2a2a] text-[10px] md:text-xs tracking-[0] leading-[normal]">
                        {card.title}
                      </div>
                      <div className="font-bold text-black text-sm md:text-base tracking-[0] leading-[normal] truncate">
                        {card.value}
                      </div>
                      <div
                        className={`font-normal text-[8px] md:text-xs tracking-[0] leading-[normal] ${card.changeColor}`}
                      >
                        {card.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mt-2">
                {summaryCards.slice(4).map((card, index) => (
                  <Card
                    key={index + 4}
                    className="w-full h-[70px] md:h-[80px] bg-white rounded-[6.8px] shadow-[0px_4px_13.3px_#00000008] border-0 transition-all duration-300 hover:shadow-lg"
                  >
                    <CardContent className="p-2 md:p-3 h-full flex flex-col justify-between">
                      <div className="font-normal text-[#2a2a2a] text-[10px] md:text-xs tracking-[0] leading-[normal]">
                        {card.title}
                      </div>
                      <div className="font-bold text-black text-sm md:text-base tracking-[0] leading-[normal] truncate">
                        {card.value}
                      </div>
                      <div
                        className={`font-normal text-[8px] md:text-xs tracking-[0] leading-[normal] ${card.changeColor}`}
                      >
                        {card.change}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Storefronts Section */}
              <section>
                <h2 className="[font-family:'Inter',Helvetica] font-normal text-black text-xl tracking-[0] leading-[normal] mb-4">
                  Storefronts
                </h2>

                <Card className="w-full h-auto md:h-[427px] bg-white rounded-[15px] border border-solid border-[#b0b0b0] shadow-[0px_4px_26.4px_#0000000d]">
                  <CardContent className="p-4 relative h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-normal text-[#2a2a2a] text-sm">Spend</div>
                      <img
                        className="w-32 md:w-40 h-auto object-contain"
                        alt="Image"
                        src="/image-26.png"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <div className="w-full bg-white rounded-xl p-2 md:p-4">
                        <div className="relative">
                          <img
                            className="w-full h-48 md:h-56 rounded-lg object-cover"
                            alt="Analytics"
                            src="/image-25.png"
                          />

                          <div className="flex justify-between mt-2 text-gray-700 text-xs px-2">
                            <span className="ml-6">$6.11k</span>
                            <span>$6.11k</span>
                          </div>

                          <img
                            className="absolute bottom-4 left-2 w-8 h-16 object-contain"
                            alt="Side Analytics"
                            src="/image-27.png"
                          />

                          <div className="w-3/4 h-2 bg-orange-500 rounded-md mt-3 mx-auto" />

                          <Info className="absolute md:bottom-0 bottom-[-1] right-3 text-gray-600 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Spend Trend Section */}
              <section className="mt-2 lg:mt-0">
                <h2 className="font-medium text-black text-sm sm:text-base md:text-lg mb-2">
                  Spend Trend
                </h2>

                <Card className="w-full h-auto md:h-[420px] transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="font-semibold text-[#2a2a2a] text-sm sm:text-base md:text-lg">Daily Spend Trend</div>
                    <div className="text-[#7b7b7b] text-xs sm:text-sm mb-4">Last 7 Days: $30,719.89</div>

                    <div className="w-full flex-1">
                      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] flex items-center justify-center p-2">
                        <SimpleLineChart
                          data={spendTrendData}
                          xKey="date"
                          yKey="spend"
                          stroke="#ff8800"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>


            {/* Top List and Biggest Changes sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
              {/* Top List section */}
              <section className="mt-3">
                <h2 className="font-normal text-black text-base md:text-lg tracking-[0] leading-[normal] mb-2">
                  Top List
                </h2>

                <Card className="w-full h-auto transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <Tabs defaultValue="campaigns" className="w-full h-full grid grid-rows-[auto_auto_1fr]">
                      <div className="flex items-center justify-between px-2 md:px-4 py-2">
                        <TabsList className="bg-transparent p-0 h-auto">
                          <TabsTrigger
                            value="campaigns"
                            className="font-bold text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-[#ff8800] rounded-none px-0 mr-2 md:mr-4"
                          >
                            Campaigns
                          </TabsTrigger>
                          <TabsTrigger
                            value="adgroups"
                            className="font-normal text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 mr-2 md:mr-4"
                            onClick={(e) => e.preventDefault()} // ⛔ prevents tab change                          
                          >
                            Ad Groups
                          </TabsTrigger>
                          <TabsTrigger
                            value="keywords"
                            className="font-normal text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 mr-2 md:mr-4"
                            onClick={(e) => e.preventDefault()} // ⛔ prevents tab change
                          >
                            Keywords
                          </TabsTrigger>
                          <TabsTrigger
                            value="ads"
                            className="font-normal text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0"
                            onClick={(e) => e.preventDefault()} // ⛔ prevents tab change
                          >
                            Ads
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <div className="w-full h-[1px] px-2 md:px-4">
                        <div className="w-full h-px bg-gray-200"></div>
                        <div className="w-[40px] h-[1px] bg-[#ff8800] ml-2"></div>
                      </div>

                      <TabsContent value="campaigns" className="mt-0 px-2 md:px-4">
                        <div className="py-1 h-full grid grid-rows-[auto_1fr]">
                          <div className="flex items-center gap-1 mb-1 flex-wrap">
                            <span className="font-normal text-black text-xs tracking-[0] leading-[normal]">
                              Spend
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0"
                            >
                              <ChevronDownIcon className="w-3 h-3" />
                            </Button>
                            <span className="font-normal text-black text-xs tracking-[0] leading-[normal] ml-2">
                              Installs
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0"
                            >
                              <ChevronDownIcon className="w-3 h-3" />
                            </Button>
                            <span className="font-normal text-black text-xs tracking-[0] leading-[normal] ml-2">
                              Conver...
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0"
                            >
                              <img
                                className="w-1.5 h-[4px]"
                                alt="Vector"
                                src="/vector.svg"
                              />
                            </Button>
                          </div>

                          <div className="space-y-0 max-h-[200px] overflow-y-auto">
                            {topListCampaigns.map((campaign, index) => (
                              <div
                                key={index}
                                className="flex items-center py-2 border-b border-gray-200 last:border-b-0 transition-all duration-300 hover:bg-gray-50"
                              >
                                <div className="w-2 h-2 bg-[#46a756] rounded-full mr-2 flex-shrink-0"></div>

                                <div className="flex-1 min-w-0">
                                  <div className="font-normal text-black text-sm truncate tracking-[0] leading-[normal]">
                                    {campaign.name}
                                  </div>
                                  <div className="font-normal text-[#747474] text-[12px] truncate tracking-[0] leading-[normal]">
                                    {campaign.location}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 ml-2">
                                  <div className="w-16 bg-[#ffce84] p-1 text-center rounded">
                                    <div className="font-semibold text-[#646464] text-[12px] tracking-[0] leading-[normal]">
                                      {campaign.spend}
                                    </div>
                                    <div className="font-normal text-neutral-500 text-[10px] tracking-[0] leading-[normal]">
                                      {campaign.spendChange}
                                    </div>
                                  </div>

                                  <div className="w-16 bg-[#f4f8f9] p-1 text-center rounded">
                                    <div className="font-semibold text-[#646464] text-[12px] tracking-[0] leading-[normal]">
                                      {campaign.installs}
                                    </div>
                                    <div className="font-normal text-neutral-500 text-[10px] tracking-[0] leading-[normal]">
                                      {campaign.installsChange}
                                    </div>
                                  </div>

                                  <div className="w-16 border border-[#9b9b9b] p-1 text-center rounded">
                                    <div className="font-semibold text-[#646464] text-[12px] tracking-[0] leading-[normal]">
                                      {campaign.conversion}
                                    </div>
                                    <div className="font-normal text-neutral-500 text-[10px] tracking-[0] leading-[normal]">
                                      {campaign.conversionChange}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </section>

              {/* Biggest Changes section */}
              <section className="mt-3">
                <h2 className="font-normal text-black text-base md:text-lg tracking-[0] leading-[normal] mb-2">
                  Biggest Changes
                </h2>

                <Card className="w-full h-auto transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0 h-full">
                    <Tabs defaultValue="campaigns" className="w-full h-full grid grid-rows-[auto_auto_1fr]">
                      <div className="flex items-center justify-between px-2 md:px-4 py-2">
                        <TabsList className="bg-transparent p-0 h-auto">
                          <TabsTrigger
                            value="campaigns"
                            className="font-bold text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-[#ff8800] rounded-none px-0 mr-2 md:mr-4"
                          >
                            Campaigns
                          </TabsTrigger>
                          <TabsTrigger
                            value="adgroups"
                            className="font-normal text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 mr-2 md:mr-4"
                            onClick={(e) => e.preventDefault()} // ⛔ prevents tab change
                          >
                            Ad Groups
                          </TabsTrigger>
                          <TabsTrigger
                            value="keywords"
                            className="font-normal text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 mr-2 md:mr-4"
                            onClick={(e) => e.preventDefault()} // ⛔ prevents tab change
                          >
                            Keywords
                          </TabsTrigger>
                          <TabsTrigger
                            value="ads"
                            className="font-normal text-black text-xs md:text-sm bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0"
                            onClick={(e) => e.preventDefault()} // ⛔ prevents tab change
                          >
                            Ads
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <div className="w-full h-[1px] px-2 md:px-4">
                        <div className="w-full h-px bg-gray-200"></div>
                        <div className="w-[40px] h-[1px] bg-[#ff8800] ml-2"></div>
                      </div>

                      <TabsContent value="campaigns" className="mt-0 px-2 md:px-4">
                        <div className="py-1 h-full grid grid-rows-[auto_1fr]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-normal text-black text-xs tracking-[0] leading-[normal]">
                              Spend
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0"
                            >
                              <ChevronDownIcon className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="space-y-0 max-h-[200px] overflow-y-auto">
                            {biggestChangesCampaigns.map((campaign, index) => (
                              <div
                                key={index}
                                className="py-1 border-b border-gray-200 last:border-b-0 transition-all duration-300 hover:bg-gray-50"
                              >
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-[#46a756] rounded-full mr-2 flex-shrink-0"></div>

                                  <div className="flex-1 min-w-0">
                                    <div className="font-normal text-black text-sm truncate tracking-[0] leading-[normal]">
                                      {campaign.name}
                                    </div>
                                    <div className="font-normal text-[#747474] text-[12px] truncate tracking-[0] leading-[normal]">
                                      {campaign.location}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-12 h-3 rounded ${index === 0 ? "bg-[#ff6100]" : index === 1 ? "bg-[#ff6100]" : index === 2 ? "bg-[#f7ce02]" : "bg-[#f7ce02]"}`}
                                    ></div>

                                    <div className="text-right">
                                      <div className="font-semibold text-[#646464] text-[12px] tracking-[0] leading-[normal]">
                                        {campaign.spend}
                                      </div>
                                      <div className="font-normal text-neutral-500 text-[10px] tracking-[0] leading-[normal]">
                                        {campaign.change}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
