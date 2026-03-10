# Custom MUI React Components

## ℹ️ Overview

A small React project showcasing **custom, reusable Material UI (MUI) components** built with flexibility and real-world usage in mind.

Each component is designed to be:

- Fully controlled via props
- Easy to theme and extend
- Suitable as a starting point for production use

This repo focuses on **component design patterns**, not app complexity.

## 📦 Components Included

### 1. Multi Select

A customizable multi-select component built on top of MUI primitives.

**Features**

- Controlled selection state
- Custom labels and values
- Optional checkboxes
- Supports disabled states
- Accessible and keyboard-friendly

**Example Props**

```tsx
<MultiSelect
  label={'My Options'}
  id={'my-options'}
  options={myOptions}
  selectedValues={selectedOptions}
  onChange={handleChange}
/>
```

### 2. Progress Bar

A horizontal progress bar with flexible styling and behavior.

**Features**

- Determinate progress
- Custom colors
- Optional label display
- Easily themeable via MUI

**Example Props**

```tsx
<ProgressBar value={75} label={'75%'} color='red' trackColor='black' thickness={20} />
```

### 3. Progress Circle

A circular progress indicator useful for dashboards and summaries.

**Features**

- Determinate progress
- Custom size and thickness
- Optional percentage label
- Works well in constrained layouts

**Example Props**

```tsx
<ProgressCircle
  value={75}
  label={'75%'}
  // label={'<b>75%</b>'}
  progressColor={'red'}
  trackColor={'black'}
  size={64}
  size={'5rem'}
  thickness={2}
  // sx={{ padding: '5rem' }}
/>
```

## 🛠️ Tech Stack

- React
- TypeScript
- Material UI (MUI)
- Vite

## 📁 Project Structure

```text
src/
├─ components/
│  ├─ MultiSelect/
│  ├─ ProgressBar/
│  └─ ProgressCircle/
├─ pages/
├─ hooks/
├─ types/
└─ App.tsx
```

Each component lives in its own folder and exposes a clean public API via props.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the app in your browser to view and interact with the components.

## 🎯 Design Goals

- Demonstrate clean component APIs
- Favor composition over configuration
- Keep components framework-agnostic beyond MUI
- Emphasize readability and maintainability

## 📌 Notes

This project is intentionally minimal:

- No backend
- No global state management
- No unnecessary dependencies

The goal is to showcase **component craftsmanship**, not application architecture.

## 📄 License

MIT
