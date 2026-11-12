<!--
Draft for the Kantet blog (Sanity project nrloy6a0, dataset production, type "post").
Create as a draft; do not publish.

title:       Puls: one dashboard for every site we look after
slug:        puls-one-dashboard-for-every-site
excerpt:     We built Puls, a small dashboard that runs on our own machine and shows every WordPress site, server and Vercel deploy in one place. Here's what it does and why. (163 characters)
tags:        WordPress, Maintenance, Tools, Vercel
coverImage:  screenshots/01-overview.png
cover alt:   The Puls overview: a list of open alerts above a table of sites with their status, updates and uptime.

Lines starting with "[image: ...]" are body images: file, then alt text.
Lines starting with "[LASSE: ...]" are things only you know. Fill in or delete.
Everything in the screenshots is made-up demo data.
-->

A website isn't finished when it launches. We wrote that a few weeks ago in [our post about the PHP vulnerability](/blog/critical-php-vulnerability-wordpress), and it's the reason for the project this post is about.

Looking after sites means knowing a lot of small things at once. Which sites have updates waiting? Did last night's backup run? Is anything down? Did the last deploy go through? Each answer lives somewhere else: a WordPress admin, a server you log in to over SSH, the Vercel dashboard, the Sanity dashboard. Checking them all takes time, so in practice some of them don't get checked.

So we built Puls. It's a dashboard that puts all of it on one screen.

[LASSE: one or two sentences on what made you start. A specific incident, the number of sites you look after, or the tool you used before. I have left this out because I don't know it.]

[image: screenshots/01-overview.png | The Puls overview: three open alerts at the top, then a table of sites with status, pending updates and 30-day uptime.]

## What needs you first

The overview answers one question: what needs attention right now? A site that is down, a build that failed and a server with updates piling up sit at the top, each with a button that takes you to the fix. Below that is every site in one table, whether it runs on WordPress or on Vercel, with its status and the updates it is waiting for.

The heading counts for you. "52 sites, 3 need you" is a better start to the morning than opening twelve tabs.

## WordPress, without logging in to each site

Puls talks to our servers over SSH and uses WP-CLI, the command-line tool for WordPress. Nothing has to be installed inside the sites themselves.

For each site it shows:

- The updates that are waiting for WordPress, plugins and themes, with a button to run one or all of them
- Every installed plugin, its version and whether it is active
- Backups, with a button to take one now or restore an old one
- Uptime for the last 30 days, and what caused each incident
- The latest lines from the debug log

[image: screenshots/03-wordpress-site.png | A WordPress site in Puls: seven updates waiting, with the site's server, WordPress and PHP version beside the list.]

[image: screenshots/05-backups.png | The same site further down: backups, uptime for the last 30 days with two incidents, and the debug log.]

## Staging in one click

In the PHP post we described our routine: back up the live site, copy it to staging, test there, then roll out. Puls now does the copying. "Create staging" makes a copy of a site, from how it is right now or from an earlier backup.

Two details matter to us here:

- The copy gets an address on our own domain, never the client's.
- The copy can't send email, and it asks search engines not to index it. A test order on staging should never end up in a real customer's inbox.

[LASSE: this is the newest part and has not been run on a real client site yet. Keep this section only if it has by the time you publish.]

## Servers, Vercel and Sanity

Not everything we build is WordPress, so Puls covers the rest as well.

- **Servers:** CPU, memory, disk and load for each server, and the sites that run on it.
- **Vercel:** every deploy for every project. When a build fails, the error is on the page, and production keeps serving the last good version.
- **Sanity:** datasets, usage, webhooks and API tokens, shown next to the site that uses them. A token that expires in nine days is the kind of thing nobody remembers until the site stops updating.

[image: screenshots/07-server.png | A server in Puls: CPU and bandwidth for the day, memory, disk and load, and the twelve sites on the server.]

[image: screenshots/09-vercel-project.png | A Vercel project in Puls: the latest build failed with a type error, with the list of recent deploys below.]

There's also a list of the sites on our own computer, a page for alerts and past incidents, and a search box that opens with ⌘K and jumps to any site or server.

[image: screenshots/13-command-palette.png | The search box open over the alerts page, with "kyst" typed and one matching site.]

## It runs on our own machine

Puls isn't a service we log in to. It runs locally on the computer we work on and can't be reached from anywhere else. The database is local too, and the access tokens and SSH keys it needs are stored encrypted.

That was a deliberate choice. A tool that can update, back up and move client sites holds a lot of access. We'd rather keep that access on a machine we control than put a login page in front of it on the internet.

For the technically curious: it's built with Next.js, Postgres and TypeScript, with a background worker that syncs the sites and runs the jobs.

## Why build it ourselves?

There are good tools for managing WordPress sites, and good tools for watching deploys. We didn't find one that covers both, plus the servers underneath, in one place. Building it ourselves also means that when something in our routine is slow, we can make a button for it.

[LASSE: say here whether Puls is something others can use or get, or an internal tool only.]

Puls doesn't do the maintenance for us. It makes it harder to forget, and quicker to do. If your site hasn't been looked at in a while and you'd like someone to keep an eye on it, get in touch.
