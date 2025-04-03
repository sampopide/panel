"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LandingKeysTab } from "@/components/settings/landing-keys-tab";
import { UsersTab } from "@/components/settings/users-tab";
import { CountriesTab } from "@/components/settings/countries-tab";
import { CitiesTab } from "@/components/settings/cities-tab";
import { StatusTab } from "@/components/settings/status-tab";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <Tabs defaultValue="landing-keys" className="space-y-6">
        <TabsList>
          <TabsTrigger value="landing-keys">Landing Keys</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="landing-keys" className="space-y-4">
          <LandingKeysTab />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UsersTab />
        </TabsContent>

        <TabsContent value="countries" className="space-y-4">
          <CountriesTab />
        </TabsContent>

        <TabsContent value="cities" className="space-y-4">
          <CitiesTab />
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <StatusTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}