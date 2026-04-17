import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  Input,
  InputPassword,
  LoaderRing,
  LoaderSpinner,
  Tooltip,
} from '@infonomic/uikit/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.page}>
      <Container>
        {/* =========================================================
            Top ruler — running head in the catalog style
         ========================================================= */}
        <div className={styles.ruler} aria-hidden>
          <div className={styles['ruler-section']}>
            <span>
              <span className={styles['ruler-dot']} />
              Infonomic · UIKit
            </span>
            <span className={styles['ruler-hidden-sm']}>v6.5.1</span>
            <span className={styles['ruler-hidden-sm']}>Specimen / 01</span>
          </div>
          <div className={styles['ruler-section']}>
            <span>{year}</span>
            <span className={styles['ruler-hidden-sm']}>Dark · Light · .not-dark</span>
          </div>
        </div>

        {/* =========================================================
            HERO
         ========================================================= */}
        <section className={styles.hero}>
          <span className={styles['hero-eyebrow']}>Component showcase · TanStack</span>

          <h1 className={styles['hero-title']}>
            Interfaces, <em>quietly</em>
            <br />
            <span className={styles['hero-rule-word']}>engineered.</span>
          </h1>

          <p className={styles['hero-sub']}>
            A framework-agnostic component kit built on CSS cascade layers, semantic intent tokens,
            and the option to opt into — or out of — Tailwind. This page is a specimen sheet.
          </p>

          <div className={styles['hero-cta']}>
            <Button intent="primary" variant="filled" size="md">
              Browse the catalog
            </Button>
            <Button
              intent="noeffect"
              variant="text"
              size="md"
              render={
                <a
                  href="https://github.com/infonomic/uikit"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source on GitHub ↗
                </a>
              }
            />
          </div>

          <aside className={styles['hero-aside']}>
            <span className={styles['hero-aside-label']}>Colophon</span>
            Display set in Roboto.
            <br />
            Body in Inter.
            <br />
            Italics in Merriweather.
            <br />
            Meta in Source Code Pro.
            <br />
            Grid on 24px.
          </aside>
        </section>

        {/* =========================================================
            FACTS STRIP
         ========================================================= */}
        <div className={styles.facts}>
          <div className={styles['facts-cell']}>
            <span className={styles['facts-num']}>52</span>
            <span className={styles['facts-label']}>Components</span>
          </div>
          <div className={styles['facts-cell']}>
            <span className={styles['facts-num']}>7</span>
            <span className={styles['facts-label']}>Semantic intents</span>
          </div>
          <div className={styles['facts-cell']}>
            <span className={styles['facts-num']}>5</span>
            <span className={styles['facts-label']}>Button variants</span>
          </div>
          <div className={styles['facts-cell']}>
            <span className={styles['facts-num']}>0</span>
            <span className={styles['facts-label']}>Tailwind inside</span>
          </div>
        </div>

        {/* =========================================================
            SPECIMEN GRID
         ========================================================= */}
        <section className={styles.grid}>
          {/* 01 — BUTTONS */}
          <article className={`${styles.spec} ${styles['span-a']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>01</b>Button
              </span>
              <span className={styles['spec-title']}>Variant × intent</span>
            </header>
            <p className={styles['spec-desc']}>
              Every button is a product of a variant and an intent. Swap either axis without
              rewriting the component.
            </p>
            <div className={`${styles['spec-body']} ${styles['spec-body-stretch']}`}>
              <div className={styles['button-matrix']}>
                <Button intent="primary" variant="filled" size="sm">
                  Filled
                </Button>
                <Button intent="primary" variant="outlined" size="sm">
                  Outlined
                </Button>
                <Button intent="primary" variant="gradient" size="sm">
                  Gradient
                </Button>
                <Button intent="primary" variant="text" size="sm">
                  Text
                </Button>
                <Button intent="success" variant="filled" size="sm">
                  Success
                </Button>
                <Button intent="warning" variant="filled" size="sm">
                  Warning
                </Button>
                <Button intent="danger" variant="outlined" size="sm">
                  Danger
                </Button>
                <Button intent="noeffect" variant="filled-weak" size="sm">
                  Neutral
                </Button>
              </div>
            </div>
            <div className={styles['spec-foot']}>
              <span>Button · IconButton · ComboButton</span>
              <span>intent × variant × size</span>
            </div>
          </article>

          {/* 02 — CHIPS */}
          <article className={`${styles.spec} ${styles['span-b']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>02</b>Chip
              </span>
              <span className={styles['spec-title']}>Status</span>
            </header>
            <p className={styles['spec-desc']}>
              Compact status tokens, addressable by the same intent vocabulary.
            </p>
            <div className={`${styles['spec-body']}`}>
              <div className={styles['chip-row']}>
                <Chip intent="primary" variant="assist" size="sm">
                  Primary
                </Chip>
                <Chip intent="success" variant="assist" size="sm">
                  Shipping
                </Chip>
                <Chip intent="warning" variant="assist" size="sm">
                  Review
                </Chip>
                <Chip intent="danger" variant="assist" size="sm">
                  Blocked
                </Chip>
                <Chip intent="noeffect" variant="assist" size="sm">
                  Draft
                </Chip>
              </div>
            </div>
            <div className={styles['spec-foot']}>
              <span>Chip</span>
              <span>assist · selectable · removable</span>
            </div>
          </article>

          {/* 03 — CARD */}
          <article className={`${styles.spec} ${styles['span-c']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>03</b>Card
              </span>
              <span className={styles['spec-title']}>Composed surface</span>
            </header>
            <p className={styles['spec-desc']}>
              Header, content, footer. Shadow and surface tokens handle light and dark.
            </p>
            <div className={`${styles['spec-body']} ${styles['spec-body-stretch']}`}>
              <Card className="w-full">
                <Card.Header>
                  <Card.Title>Release candidate</Card.Title>
                  <Card.Description>
                    Tag v6.6.0 — a token refactor and ShadCN compatibility layer.
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <p className="text-sm opacity-80">
                    Every intent family now has parity across <code>:root</code>, <code>.dark</code>
                    , and <code>.not-dark</code>. Field-state tokens landed.
                  </p>
                </Card.Content>
                <Card.Footer>
                  <Button intent="primary" variant="filled" size="sm">
                    Read changelog
                  </Button>
                </Card.Footer>
              </Card>
            </div>
            <div className={styles['spec-foot']}>
              <span>Card.Header · Content · Footer</span>
              <span>--surface-panel</span>
            </div>
          </article>

          {/* 04 — FORM */}
          <article className={`${styles.spec} ${styles['span-d']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>04</b>Form
              </span>
              <span className={styles['spec-title']}>Input · Password · Checkbox</span>
            </header>
            <p className={styles['spec-desc']}>
              Field-state tokens route validation through the danger intent. No hardcoded reds.
            </p>
            <div className={`${styles['spec-body']} ${styles['spec-body-stretch']}`}>
              <div className={styles['form-stack']}>
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  placeHolder="you@infonomic.io"
                  intent="primary"
                  inputSize="md"
                />
                <InputPassword
                  id="password"
                  name="password"
                  label="Password"
                  placeHolder="•••••••••"
                  intent="primary"
                  inputSize="md"
                  helpText="Minimum 12 characters"
                />
                <Checkbox
                  id="remember"
                  name="remember"
                  label="Remember this device"
                  intent="primary"
                  variant="filled"
                  size="sm"
                />
              </div>
            </div>
            <div className={styles['spec-foot']}>
              <span>Input · InputPassword · Checkbox</span>
              <span>--field-border-invalid</span>
            </div>
          </article>

          {/* 05 — ALERT */}
          <article className={`${styles.spec} ${styles['span-e']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>05</b>Alert
              </span>
              <span className={styles['spec-title']}>Inline notice</span>
            </header>
            <p className={styles['spec-desc']}>
              Intent, icon, dismiss — nothing else. The whole thing answers to the same token set.
            </p>
            <div className={`${styles['spec-body']} ${styles['spec-body-stretch']}`}>
              <Alert
                intent="info"
                title="Compatibility layer is opt-in"
                icon
                close={false}
                className="w-full"
              >
                ShadCN semantic utilities (<code>bg-card</code>, <code>ring-ring</code>,
                <code> text-muted-foreground</code>) resolve against <code>--shadcn-*</code> aliases
                when you register them in Tailwind.
              </Alert>
            </div>
            <div className={styles['spec-foot']}>
              <span>Alert · Toast</span>
              <span>success · info · warning · danger</span>
            </div>
          </article>

          {/* 06 — AVATARS + LOADERS (stacked) */}
          <article className={`${styles.spec} ${styles['span-f']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>06</b>Avatar · Loader
              </span>
              <span className={styles['spec-title']}>Micro</span>
            </header>
            <p className={styles['spec-desc']}>
              Image fallback with initials; two loader glyphs drawn with CSS only.
            </p>
            <div className={styles['spec-body']}>
              <div className="flex flex-col items-center gap-8 w-full">
                <div className={styles['avatar-group']}>
                  <Avatar initials="AB" />
                  <Avatar initials="DL" />
                  <Avatar initials="JN" />
                  <Avatar initials="+4" />
                </div>
                <div className={styles['loader-row']}>
                  <LoaderRing size={22} />
                  <LoaderSpinner size={22} />
                </div>
              </div>
            </div>
            <div className={styles['spec-foot']}>
              <span>Avatar · LoaderRing · LoaderSpinner</span>
              <span>currentColor</span>
            </div>
          </article>

          {/* 07 — TOOLTIP */}
          <article className={`${styles.spec} ${styles['span-g']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>07</b>Tooltip
              </span>
              <span className={styles['spec-title']}>Hover</span>
            </header>
            <p className={styles['spec-desc']}>
              Hover the button. Arrow and popup use the same surface token as popovers.
            </p>
            <div className={styles['spec-body']}>
              <div className={styles['tooltip-demo']}>
                <Tooltip side="top" text="Wired via Base UI">
                  <Button intent="secondary" variant="outlined" size="sm">
                    Hover me
                  </Button>
                </Tooltip>
                <span className={styles['tooltip-demo-hint']}>
                  ↑ tooltip anchors here
                </span>
              </div>
            </div>
            <div className={styles['spec-foot']}>
              <span>Tooltip</span>
              <span>side · delay · open</span>
            </div>
          </article>

          {/* 08 — BADGES */}
          <article className={`${styles.spec} ${styles['span-h']}`}>
            <header className={styles['spec-head']}>
              <span className={styles['spec-num']}>
                <b>08</b>Badge
              </span>
              <span className={styles['spec-title']}>Density marks</span>
            </header>
            <p className={styles['spec-desc']}>
              Smaller than a chip, quieter than a button. Useful as metadata on list rows and cards.
            </p>
            <div className={styles['spec-body']}>
              <div className={styles['badge-row']}>
                <Badge intent="primary">New</Badge>
                <Badge intent="secondary">Beta</Badge>
                <Badge intent="success">Stable</Badge>
                <Badge intent="info">Info</Badge>
                <Badge intent="warning">Preview</Badge>
                <Badge intent="danger">Breaking</Badge>
                <Badge intent="noeffect">Draft</Badge>
              </div>
            </div>
            <div className={styles['spec-foot']}>
              <span>Badge</span>
              <span>7 intents</span>
            </div>
          </article>
        </section>

        {/* =========================================================
            CTA BAND
         ========================================================= */}
        <section className={styles.band}>
          <div>
            <h2 className={styles['band-title']}>
              Sized to fit, <em>not</em> to impress.
            </h2>
            <p className={styles['band-sub']}>
              52 components, one semantic token model, zero mandatory runtime dependencies. Works
              with React, Astro, and anything that can import a stylesheet.
            </p>
          </div>
          <div className={styles['band-cta']}>
            <Button
              intent="primary"
              variant="filled"
              size="md"
              render={<Link to="/buttons" />}
            >
              Buttons
            </Button>
            <Button
              intent="secondary"
              variant="outlined"
              size="md"
              render={<Link to="/cards" />}
            >
              Cards
            </Button>
            <Button
              intent="noeffect"
              variant="text"
              size="md"
              render={<Link to="/prose" />}
            >
              Prose
            </Button>
          </div>
        </section>

        {/* =========================================================
            BOTTOM RULER
         ========================================================= */}
        <div className={`${styles.ruler} ${styles['ruler-end']}`} aria-hidden>
          <div className={styles['ruler-section']}>
            <span>End of specimen · 01</span>
          </div>
          <div className={styles['ruler-section']}>
            <span className={styles['ruler-hidden-sm']}>Set on a 24px grid</span>
            <span>Infonomic</span>
          </div>
        </div>
      </Container>
    </div>
  )
}
