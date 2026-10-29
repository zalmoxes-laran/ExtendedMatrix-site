# How a release reaches the site

The site never types a version number. Every number it shows is read, at
build time, from where the tool is published:

| Tool | Where the number is read | Channel string in `src/content/versions/*.md` |
| --- | --- | --- |
| EM Tools | Blender extension repo (`blender.extendedmatrix.org`) | `auto:blender:em_tools:stable` or `…:dev` |
| 3DSC | Blender extension repo | `auto:blender:dsc_tools:dev` |
| s3dgraphy | PyPI | `auto:pypi:s3dgraphy` or `auto:pypi:s3dgraphy:1.6.0.dev` |
| EMStudio | GitHub Releases (latest non-draft) | `auto:github:ExtendedMatrix/EMStudio` |

The older short names (`auto:em-tools`, `auto:emstudio`, …) still work.

`src/lib/releases.ts` turns all of this into one manifest. Every page reads
it, and so does `/status.json`, which the manuals and EMStudio read in turn.
The state of a line (recommended, legacy, in development, archived) is
computed from `releaseDate` and `eolDate`: nobody writes it by hand.

## When the site rebuilds

- at every push to `main`;
- every six hours (`schedule` in `.github/workflows/build.yml`);
- **at every release of a tool**, through `repository_dispatch`.

To enable the last one, add this step at the end of the release workflow of
EM-blender-tools, s3Dgraphy, EMStudio and 3D-survey-collection. It needs a
secret `SITE_DISPATCH_TOKEN`: a fine-grained token with *Contents: read and
write* on `zalmoxes-laran/ExtendedMatrix-site` only.

```yaml
      - name: Tell extendedmatrix.org a release is out
        if: success()
        run: |
          curl -sS -X POST \
            -H "Authorization: Bearer ${{ secrets.SITE_DISPATCH_TOKEN }}" \
            -H "Accept: application/vnd.github+json" \
            https://api.github.com/repos/zalmoxes-laran/ExtendedMatrix-site/dispatches \
            -d '{"event_type":"em-release","client_payload":{"repo":"${{ github.repository }}","tag":"${{ github.ref_name }}"}}'
```

## The coherence check

After the build, `scripts/check-coherence.mjs` reads every page and writes
warnings in the log for: maintainer words in public text, "planned" dates
already past, links to manuals on a Read the Docs version that is not
active, and sentences that name a "recommended" line different from the
real one. Run it locally with `npm run build && npm run check:coherence`.
With `--strict` a broken manual link stops the build.

## The banner in the manuals

Add to the `conf.py` of each manual on Read the Docs:

```python
html_js_files = ['https://www.extendedmatrix.org/status-banner.js']
```

A reader on the docs of a line that is not the recommended one sees a bar
that says so and opens the same page in the recommended line.
