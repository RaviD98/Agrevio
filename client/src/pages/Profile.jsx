import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, ShoppingBag, Heart } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-green-50 dark:bg-[#121212] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Section */}
        <Card className="rounded-3xl shadow-xl border-none bg-white dark:bg-green-950">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="h-28 w-28 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-green-900 dark:text-white">
                {user?.name}
              </h1>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail size={18} /> {user?.email}
              </p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone size={18} /> +91 XXXXXXXXXX
              </p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin size={18} /> India
              </p>
              <Button className="mt-3 bg-green-600 hover:bg-green-700">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6 flex items-center gap-4">
              <ShoppingBag className="text-green-600" size={30} />
              <div>
                <h2 className="text-xl font-semibold">My Orders</h2>
                <p className="text-gray-500">Check your order history</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6 flex items-center gap-4">
              <Heart className="text-red-500" size={30} />
              <div>
                <h2 className="text-xl font-semibold">Wishlist</h2>
                <p className="text-gray-500">Saved favourite items</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;