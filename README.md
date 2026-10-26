# Integhra Institucional

Sitio web institucional de Integhra Global, desarrollado con [Astro](https://astro.build/) y generado como un sitio estático.

## Requisitos

* Node.js compatible con las dependencias del proyecto.
* npm.
* Git para obtener y actualizar el código fuente.

Se recomienda utilizar una versión de Node.js validada tanto en el entorno de desarrollo como en el de producción.

## Instalación y desarrollo

Todos los comandos se ejecutan desde la raíz del repositorio.

### Instalar dependencias

Para instalar las dependencias durante el desarrollo:

```bash
npm install
```

Para realizar una instalación reproducible utilizando las versiones registradas en `package-lock.json`:

```bash
npm ci
```

`npm ci` requiere que `package.json` y `package-lock.json` sean consistentes. Instala las dependencias según el lockfile y no lo modifica.

### Ejecutar el servidor local

```bash
npm run dev
```

Astro iniciará el servidor de desarrollo, normalmente disponible en http://localhost:4321.

### Generar el sitio

```bash
npm run build
```

El sitio estático se genera en el directorio `dist/`.

### Previsualizar el build

```bash
npm run preview
```

Este comando permite previsualizar localmente el sitio generado antes de publicarlo.

### Consultar los comandos de Astro

Para consultar las opciones disponibles de Astro:

```bash
npm run astro -- --help
```

## Rutas del sitio

El build validado genera las siguientes páginas:

| Ruta               | Página         |
| ------------------ | -------------- |
| `/`                | Inicio         |
| `/arq/`            | ARQ            |
| `/general/`        | General        |
| `/nosotros/`       | Nosotros       |
| `/sobre-nosotros/` | Sobre nosotros |
| `/vet/`            | VET            |

Esta lista debe actualizarse cuando se incorporen, eliminen o modifiquen rutas.

## Preparar una versión para producción

La rama `main` es la rama de referencia para preparar las versiones destinadas a producción.

Antes de publicar, se debe identificar el commit aprobado, validar el build y confirmar que el procedimiento de despliegue publique exactamente esa versión.

### 1. Actualizar el repositorio

Cambiar a `main`, consultar las actualizaciones disponibles y sincronizar la rama con GitHub:

```bash
git switch main
git fetch origin
git pull --ff-only origin main
```

Comprobar el estado:

```bash
git status -sb
```

No continuar si hay cambios locales pendientes que no hayan sido revisados.

### 2. Instalar las dependencias

```bash
npm ci
```

Este comando instala las dependencias a partir de `package-lock.json`. Si el archivo no es consistente con `package.json`, la instalación falla y será necesario revisar el problema antes de continuar.

### 3. Auditar las dependencias

```bash
npm audit
```

Revisar el resultado y resolver las vulnerabilidades que requieran atención antes de publicar.

Un resultado de `found 0 vulnerabilities` indica que la auditoría no detectó vulnerabilidades conocidas en las dependencias examinadas. No constituye una garantía absoluta de seguridad.

### 4. Generar el build de producción

```bash
npm run build
```

La compilación debe finalizar correctamente y generar los archivos estáticos en `dist/`.

Si la compilación falla, no publicar esa versión.

### 5. Verificar el resultado

Ejecutar:

```bash
git status
git log -1 --oneline
```

Confirmar que:

* La rama actual es `main`.
* El commit corresponde a la versión aprobada para producción.
* No hay modificaciones locales inesperadas.

El proceso de compilación no debería modificar los archivos versionados del proyecto. Si aparecen cambios, revisarlos antes de continuar.

## Despliegue en producción

**Generar el build no publica automáticamente el sitio en producción.**

Una vez validado el resultado, se debe publicar el contenido de `dist/` mediante el mecanismo de despliegue configurado para el entorno de producción.

Antes de desplegar, confirmar que:

* El destino y el entorno sean los correctos.
* El despliegue utilice el commit aprobado de `main`.
* La configuración del hosting permita servir correctamente las rutas del sitio.
* Exista un procedimiento para verificar el sitio publicado.
* Se haya definido cómo recuperar la versión anterior si se detecta un problema.

Los pasos concretos de publicación dependen de la infraestructura de hosting y del proceso de integración y despliegue continuo (CI/CD) utilizado por el proyecto.

## Documentación

* [Documentación oficial de Astro](https://docs.astro.build/)
* [Estructura de un proyecto Astro](https://docs.astro.build/en/basics/project-structure/)
