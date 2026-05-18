import React from 'react'
import './AppLayout.scss'

interface AppLayoutProps {
    children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <main className="app-layout">
            <section className="app-layout-hero">
                <div className="app-layout-hero__content">
                    <p className="app-layout-hero__eyebrow">Currency exchange calculator</p>
                    <h1 className="app-layout-hero__title">Convert currencies in real time</h1>
                    <p className="app-layout-hero__description">
                        Enter an amount, choose your currencies and get an estimated exchange value.
                    </p>
                </div>
            </section>

            <section className="app-layout-content">
                {children}
            </section>
            <div className="converter-footer">
            </div>
        </main>
    )
}
